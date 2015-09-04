'use strict';
/*eslint-env node*/

(function() {
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
		tensInPower: {
			'3': {pluralForms: ['тысяча', 'тысячи', 'тысяч']},
			'6': {pluralForms: ['миллион', 'миллиона', 'миллионов']},
			'9': {pluralForms: ['миллиард', 'миллиарда', 'миллиардов']},
			'12': {pluralForms: ['триллион', 'триллиона', 'триллионов']}
		},
		parseOnesAndTeens: parseOnesAndTeens,
		parseTens: parseTens,
		parseHundreds: parseHundreds,
		parseTensInPower: parseTensInPower
	};

	function parseOnesAndTeens(resultParts, numberString, tenInPower) {
		var gender = tenInPower === 3
			? 'feminine'
			: 'masculine';

		resultParts.push(
			(locale[numberString][gender] || locale[numberString]) + ' '
		);

		return numberString;
	}

	function parseTens(resultParts, numberString, tenInPower) {
		resultParts.push(locale.tens[numberString[0]] + ' ');

		return numberString[1];
	}

	function parseHundreds(resultParts, numberString, tenInPower) {
		resultParts.push(locale.hundreds[numberString[0]] + ' ');

		return numberString.slice(1, 3);
	}

	function parseTensInPower(resultParts, numberString, tenInPower) {
		var pluralForm = _plural(
			numberString,
			locale.tensInPower[tenInPower].pluralForms
		);

		resultParts.push(pluralForm + ' ');
	}

	function _plural(number, wordForms) {
		number = parseInt(number, 10);

		if (number === 1) {
			return wordForms[0];
		}

		if (number >= 2 && number <= 4) {
			return wordForms[1];
		}

		return wordForms[2];
	}

	if (typeof module !== 'undefined') {
		module.exports = locale;
	}

	if (typeof window !== 'undefined' &&
		this.fortyTwo &&
		this.fortyTwo.addLocale
	) {
		this.fortyTwo.addLocale('ru', locale);
	}
}).call(this);