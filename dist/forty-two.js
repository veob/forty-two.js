'use strict';
/*eslint-env node*/

(function() {
	function FortyTwo(params) {
		this.params = params || {};

		this.locales = {};
		this.locales.ru = {
			'1': 'один',
			'2': 'два',
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
			'20': 'двадцать',
			'30': 'тридцать',
			'40': 'сорок',
			'50': 'пятьдесят',
			'60': 'шестьдесят',
			'70': 'семьдесят',
			'80': 'восемьдесят',
			'90': 'девяносто',
			'100': 'сто',
			'200': 'двести',
			'300': 'триста',
			'400': 'четыреста',
			'500': 'пятьсот',
			'600': 'шестьсот',
			'700': 'семьсот',
			'800': 'восемьсот',
			'900': 'девятьсот',
			'1000': 'тысяча',
			'1000000': 'миллион'
		};
	}

	FortyTwo.prototype.wordify = function(number, locale) {
		locale = locale || 'ru';
		var parts = [];

		var lastPart = this.locales[locale][(number % 100)];
		parts.push(lastPart);

		return parts.join(' ');
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