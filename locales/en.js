'use strict';
/*eslint-env node*/

(function() {
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
		'tensInPower': {
			'3': 'thousand',
			'6': 'million',
			'9': 'billion',
			'12': 'trillion'
		},
		parseOnesAndTeens: parseOnesAndTeens,
		parseTens: parseTens,
		parseHundreds: parseHundreds,
		parseTensInPower: parseTensInPower
	};

	function parseOnesAndTeens(resultParts, numberString, tenInPower) {
		resultParts.push(locale[numberString] + ' ');

		return numberString;
	}

	function parseTens(resultParts, numberString, tenInPower) {
		var value = locale.tens[numberString[0]];

		value = value + (
			numberString[1] !== '0'
				? '-'
				: ' '
		);

		resultParts.push(value);

		return numberString[1];
	}

	function parseHundreds(resultParts, numberString, tenInPower) {
		var value = locale[numberString[0]] + ' hundred ';

		resultParts.push(value);

		return numberString.slice(1, 3);
	}

	function parseTensInPower(resultParts, numberString, tenInPower) {
		resultParts.push(
			locale.tensInPower[tenInPower] + ' '
		);
	}

	if (typeof module !== 'undefined') {
		module.exports = locale;
	}

	if (typeof window !== 'undefined' &&
		this.fortyTwo &&
		this.fortyTwo.addLocale
	) {
		this.fortyTwo.addLocale('en', locale);
	}

}).call(this);