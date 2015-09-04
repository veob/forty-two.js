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