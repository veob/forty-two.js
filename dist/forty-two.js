'use strict';
/*eslint-env node*/

(function() {
	var root = this;

	//internal fortyTwo object
	var _ft = {
		locales: {
			ru: {
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
				tens: [
					'', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
					'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
				],
				hundreds: [
					'', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
					'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
				],
				tenInPower: {
					'3': {pluralForms: ['тысяча', 'тысячи', 'тысяч']},
					'6': {pluralForms: ['миллион', 'миллиона', 'миллионов']},
					'9': {pluralForms: ['миллиард', 'миллиарда', 'миллиардов']},
					'12': {pluralForms: ['триллион', 'триллиона', 'триллионов']}
				}
			}
		},
		defaultLocale: 'ru',
		parse: parse
	};

	var fortyTwo = function(params) {
		_ft.defaultLocale = params.defaultLocale || _ft.defaultLocale;
	};

	fortyTwo.addLocale = addLocale;
	fortyTwo.wordify = wordify;
	fortyTwo.setDefaultLocale = setDefaultLocale;

	function addLocale(localeName, locale) {
		_ft.locales[localeName] = locale;
	}

	function setDefaultLocale(localeName) {
		_ft.defaultLocale = localeName;
	}

	function wordify(number, locale) {
		var parts = [];
		var resultParts = [];

		locale = _ft.locales[locale || _ft.defaultLocale];

		if (!_isNumeric(number)) {
			throw new Error('`number` is not a number');
		}


		var parsedNumber = parseInt(number, 10);
		if (number !== parsedNumber) {
			if (typeof number !== 'string') {
				console.warn('FortyTwo.wordify: got float number, ' +
							' will parse only integer part'
				);
			}
		}

		parsedNumber = parsedNumber.toString();

		//Split number in parts by three
		var partsLength = Math.ceil(parsedNumber.length / 3);
		for (var i = 1; i <= partsLength; i++) {
			var start = parsedNumber.length - (i * 3);
			var end = start + 3;
			start = start >= 0 ? start : 0;

			parts.push(parsedNumber.slice(start, end));
		}

		//Parse parts in reverse order
		for (var rank = partsLength - 1; rank >= 0; rank--) {
			var tempPart = parseInt(parts[rank], 10);
			if (tempPart) {
				_ft.parse(resultParts, tempPart, rank * 3, locale);
			}
		}

		var result = resultParts.join('').replace(/\s+$/, '');

		return result;
	}

	function parse(resultParts, currentNumber, tenInPower, locale) {
		var numberString = currentNumber.toString();

		if (numberString.length === 3) {
			numberString = locale.parseHundreds(
				resultParts,
				numberString,
				tenInPower
			);
		}

		if (numberString >= 20) {
			numberString = locale.parseTens(
				resultParts,
				numberString,
				tenInPower
			);
		}

		numberString = parseInt(numberString, 10);
		if (numberString) {
			numberString = locale.parseOnesAndTeens(
				resultParts,
				numberString,
				tenInPower
			);
		}

		if (tenInPower >= 3) {
			numberString = locale.parseTensInPower(
				resultParts,
				numberString,
				tenInPower
			);
		}
	}

	function _isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	if (typeof exports !== 'undefined' ) {
		if (typeof module !== 'undefined' && module.exports ) {
			exports = module.exports = fortyTwo;
		}
		module.exports = fortyTwo;
	}
	else {
		root.fortyTwo = fortyTwo;
	}

}.call(this));