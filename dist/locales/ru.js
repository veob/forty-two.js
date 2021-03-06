'use strict';
/*eslint no-undef:0*/

(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		//AMD
		return define(['fortyTwo'], factory);
	}

	if (typeof module === 'object' && module.exports) {
		return module.exports = factory(require('../forty-two'));
	}

	factory(global.fortyTwo);
}(this, function(fortyTwo) {

	var locale = {
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
		powerOfTen: {
			'3': {pluralForms: ['тысяча', 'тысячи', 'тысяч']},
			'6': {pluralForms: ['миллион', 'миллиона', 'миллионов']},
			'9': {pluralForms: ['миллиард', 'миллиарда', 'миллиардов']},
			'12': {pluralForms: ['триллион', 'триллиона', 'триллионов']}
		},
		parseOnesAndTeens: parseOnesAndTeens,
		parseTens: parseTens,
		parseHundreds: parseHundreds,
		parsePowerOfTen: parsePowerOfTen
	};

	var DELIMITER = ' ';

	function parseOnesAndTeens(resultParts, numberString, currentPosition) {
		var gender = currentPosition === 3
			? 'feminine'
			: 'masculine';

		resultParts.push(
			(locale[numberString][gender] || locale[numberString]) + DELIMITER
		);

		return numberString;
	}

	function parseTens(resultParts, numberString, currentPosition) {
		resultParts.push(locale.tens[numberString[0]] + DELIMITER);

		return numberString[1];
	}

	function parseHundreds(resultParts, numberString, currentPosition) {
		resultParts.push(locale.hundreds[numberString[0]] + DELIMITER);

		return numberString.slice(1, 3);
	}

	function parsePowerOfTen(resultParts, numberString, currentPosition) {
		var pluralForm = _pluralize(
			numberString,
			locale.powerOfTen[currentPosition].pluralForms
		);

		resultParts.push(pluralForm + DELIMITER);
	}

	function _pluralize(number, wordForms) {
		number = parseInt(number, 10);

		if (number === 1) {
			return wordForms[0];
		}

		if (number >= 2 && number <= 4) {
			return wordForms[1];
		}

		return wordForms[2];
	}

	fortyTwo.addLocale('ru', locale);

	return 'ru';
}));