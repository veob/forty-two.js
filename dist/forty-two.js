'use strict';
/*eslint-env node*/

(function() {
	function FortyTwo(params) {
		params = params || {};
		this.defaultLocale = params.defaultLocale || 'ru';

		this.locales = {};
		this.locales.ru = {
			'0': '',
			'1': {feminine: 'одна', masculine: 'один'},
			'2': {feminine: 'две', masculine: 'два'},
			'3': 'три',
			'4': 'четыре',
			'5': 'пять',
			'6': 'шесть',
			'7': 'семь',
			'8': 'восемь',
			'9': 'девять',
			'10': 'десять',
			'11': 'одиннадцать',
			'12': 'двенадцать',
			'13': 'тринадцать',
			'14': 'четырнадцать',
			'15': 'пятнадцать',
			'16': 'шестанадцать',
			'17': 'семнадцать',
			'18': 'восемнадцать',
			'19': 'девятнадцать',
			'tens': [
				'', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
				'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
			],
			'hundreds': [
				'', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
				'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
			],
			'tenInPower': {
				'3': {pluralForms: ['тысяча', 'тысячи', 'тысяч']},
				'6': {pluralForms: ['миллион', 'миллиона', 'миллионов']},
				'9': {pluralForms: ['миллиард', 'миллиарда', 'миллиардов']},
				'12': {pluralForms: ['триллион', 'триллиона', 'триллионов']}
			}
		};

		this.parse = function(memo, currentNumber, currentRank, locale) {
			var numberString = currentNumber.toString();

			if (numberString.length === 3) {
				//parse hundreds
				memo.push(locale.hundreds[numberString[0]]);

				numberString = numberString.slice(1, 3);
			}

			if (numberString >= 20) {
				//parse tens
				memo.push(locale.tens[numberString[0]]);
				numberString = numberString[1];
			}

			numberString = parseInt(numberString, 10);
			if (numberString) {
				//parse ones
				var gender = currentRank === 3 ? 'feminine' : 'masculine';
				memo.push(locale[numberString][gender] || locale[numberString]);
			}

			if (currentRank >= 3) {
				///parse ten in power >= 3 (thousands, millons, etc.)
				memo.push(
					this.plural(
						numberString,
						locale
							.tenInPower[currentRank].pluralForms ||
										locale.tenInPower[currentRank]
					)
				);
			}
		};
	}

	FortyTwo.prototype.wordify = function(number, locale) {
		var chunks = [];
		var resultChunks = [];

		locale = this.locales[locale || this.defaultLocale];


		var parsedNumber = parseInt(number, 10);
		if (number !== parsedNumber) {
			console.warn('FortyTwo.wordify: got float number, ' +
						' will parse only integer part'
			);
		}

		parsedNumber = parsedNumber.toString();

		//Split number in chunks by three
		var partsLength = Math.ceil(parsedNumber.length / 3);
		for (var i = 1; i <= partsLength; i++) {
			var start = parsedNumber.length - (i * 3);
			var end = start + 3;
			start = start >= 0 ? start : 0;

			chunks.push(parsedNumber.slice(start, end));
		}

		//Parse chunks in reverse order
		for (var rank = partsLength - 1; rank >= 0; rank--) {
			var tempChunk = parseInt(chunks[rank], 10);
			if (tempChunk) {
				this.parse(resultChunks, tempChunk, rank * 3, locale);
			}
		}

		var result = resultChunks.join(' ');

		return result;
	};

	FortyTwo.prototype.plural = function(number, wordForms) {
		number = parseInt(number, 10);

		if (number === 1) {
			return wordForms[0];
		}

		if (number >= 2 && number <= 4) {
			return wordForms[1];
		}

		return wordForms[2];
	};

	if (typeof exports !== 'undefined' ) {
		if (typeof module !== 'undefined' && module.exports ) {
			exports = module.exports = FortyTwo;
		}
		module.exports = FortyTwo;
	}
	else {
		this.FortyTwo = FortyTwo;
	}
}());