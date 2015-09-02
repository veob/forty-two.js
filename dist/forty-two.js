'use strict';
/*eslint-env node*/

(function() {
	function FortyTwo(params) {
		this.params = params || {};

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
			'20': 'двадцать',
			'30': 'тридцать',
			'40': 'сорок',
			'50': 'пятьдесят',
			'60': 'шестьдесят',
			'70': 'семьдесят',
			'80': 'восемьдесят',
			'90': 'девяносто',
			'hundreds': [
				'', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
				'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
			],
			'tenInPower': {
				'3': {pluralForms: ['тысяча', 'тысячи', 'тысяч']},
				'6': {pluralForms: ['миллион', 'миллиона', 'миллионов']},
				'9': {pluralForms: ['миллиард', 'миллиарда', 'миллиардов']}
			}
		};

		this._parse = function(memo, number, rank) {
			var result = [];
			if (number.toString().length === 3) {
				var hundred = (~~(number / 100) * 100);

				//parse hundreds
				result.push(this.locales.ru[hundred]);
				number = number % 100;
			}

			if (number >= 20) {
				var ten = (~~(number / 10) * 10);
				result.push(this.locales.ru[ten]);
				number = number.toString()[1];
			}

			var gender = 'masculine';
			if (rank === 2) {
				gender = 'feminine';
			}

			result.push(this.locales.ru[number][gender] || this.locales.ru[number]);

			if (rank === 2) {
				result.push(this.plural(number, this.locales.ru[1000].pluralForms || this.locales.ru[1000]));
			}

			if (rank === 3) {
				result.push(this.plural(number, this.locales.ru[1000000].pluralForms || this.locales.ru[1000]));
			}

			return result;
		};

		this.parse = function(memo, currentNumber, currentRank, locale) {
			var numberString = currentNumber.toString();
			if (numberString.length === 3) {
				//parse hundreds
				memo.push(locale.hundreds[numberString[0]]);

				numberString = numberString.slice(1, 3);
			}

			if (currentNumber >= 20) {
				memo.push(this.locales.ru[ten]);
				currentNumber = currentNumber.toString()[1];
			}

			var gender = 'masculine';
			if (currentRank === 2) {
				gender = 'feminine';
			}

			memo.push(locale[currentNumber][gender] || locale[currentNumber]);

			if (currentRank === 2) {
				memo.push(this.plural(currentNumber, locale[1000].pluralForms || locale[1000]));
			}

			if (currentRank === 3) {
				memo.push(this.plural(currentNumber, locale[1000000].pluralForms || locale[1000]));
			}

		};
	}
	FortyTwo.prototype.wordify = function(number, locale) {
		number = number.toString();

		locale = locale || 'ru';
		var parts = [];
		var resultParts = [];

		var partsLength = Math.ceil(number.length / 3);
		for (var i = 1; i <= partsLength; i ++) {
			var start = number.length - (i * 3);
			var end = start + 3;
			start = start >= 0 ? start : 0;

			parts.push(number.slice(start, end));
		}

		var rank = parts.length;

		for (i = partsLength - 1; i >= 0; i--) {
			var temp = parts[i];

			if (parseInt(temp, 10)) {
				resultParts = resultParts.concat(this._parse(temp, rank));
			}
			rank--;
		}

		resultParts = filter(resultParts);
		var result = resultParts.join(' ');

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

	function filter(array) {
		var result = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i]) {
				result.push(array[i]);
			}
		}
		return result;
	}

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