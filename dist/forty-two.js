'use strict';
/*eslint-env node*/

(function() {
	var root = this;

	//internal fortyTwo object

	var fortyTwo = {
		_locales: {},
		_defaultLocale: ''
	};

	fortyTwo.addLocale = addLocale;
	fortyTwo.wordify = wordify;
	fortyTwo.setDefaultLocale = setDefaultLocale;

	function addLocale(localeName, locale) {
		fortyTwo._locales[localeName] = locale;
	}

	function setDefaultLocale(localeName) {
		fortyTwo._defaultLocale = localeName;
	}

	function wordify(number, locale) {
		var parts = [];
		var resultParts = [];

		locale = fortyTwo._locales[locale || fortyTwo._defaultLocale];

		if (!_isNumeric(number)) {
			throw new Error('`number` is not a number');
		}


		var parsedNumber = parseInt(number, 10);
		if (number !== parsedNumber) {
			if (typeof number !== 'string') {
				console.warn('fortyTwo.wordify: got float number, ' +
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

		var parseFunction = locale.parse || defaultParse;
		//Parse parts in reverse order
		for (var rank = partsLength - 1; rank >= 0; rank--) {
			var tempPart = parseInt(parts[rank], 10);
			if (tempPart) {
				parseFunction(resultParts, tempPart, rank * 3, locale);
			}
		}

		//join and trim result
		var result = resultParts
			.join('')
			.replace(/\s+$/, '');

		return result;
	}

	function defaultParse(resultParts, currentNumber, currentPosition, locale) {
		var numberString = currentNumber.toString();

		if (numberString.length === 3) {
			numberString = locale.parseHundreds(
				resultParts,
				numberString,
				currentPosition
			);
		}

		if (numberString >= 20) {
			numberString = locale.parseTens(
				resultParts,
				numberString,
				currentPosition
			);
		}

		numberString = parseInt(numberString, 10);
		if (numberString) {
			numberString = locale.parseOnesAndTeens(
				resultParts,
				numberString,
				currentPosition
			);
		}

		if (currentPosition >= 3) {
			numberString = locale.parsePowerOfTen(
				resultParts,
				numberString,
				currentPosition
			);
		}
	}

	function _isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	var enLocale = (function() {
		var locale = {
			'0': '',
			'1': 'one',
			'2': 'two',
			'3': 'three',
			'4': 'four',
			'5': 'five',
			'6': 'six',
			'7': 'seven',
			'8': 'eight',
			'9': 'nine',
			'10': 'ten',
			'11': 'eleven',
			'12': 'twelve',
			'13': 'thirteen',
			'14': 'fourteen',
			'15': 'fifteen',
			'16': 'sixteen',
			'17': 'seventeen',
			'18': 'eighteen',
			'19': 'nineteen',
			'tens': [
				'', '', 'twenty', 'thirty', 'forty', 'fifty',
				'sixty', 'seventy', 'eighty', 'ninety'
			],
			'powerOfTen': {
				'3': 'thousand',
				'6': 'million',
				'9': 'billion',
				'12': 'trillion'
			},
			parseOnesAndTeens: parseOnesAndTeens,
			parseTens: parseTens,
			parseHundreds: parseHundreds,
			parsePowerOfTen: parsePowerOfTen
		};
		var DELIMITER = ' ';

		function parseOnesAndTeens(resultParts, numberString, powerOfTen) {
			resultParts.push(locale[numberString] + DELIMITER);

			return numberString;
		}
		function parseTens(resultParts, numberString, powerOfTen) {
			var value = locale.tens[numberString[0]];

			value = value + (
				numberString[1] !== '0'
					? '-'
					: DELIMITER
			);

			resultParts.push(value);

			return numberString[1];
		}
		function parseHundreds(resultParts, numberString, powerOfTen) {
			var value = locale[numberString[0]] + ' hundred ';

			resultParts.push(value);

			return numberString.slice(1, 3);
		}
		function parsePowerOfTen(resultParts, numberString, powerOfTen) {
			resultParts.push(
				locale.powerOfTen[powerOfTen] + DELIMITER
			);
		}

		return locale;
	})();


	fortyTwo.addLocale('en', enLocale);
	fortyTwo.setDefaultLocale('en');

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