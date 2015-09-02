'use strict';
/*eslint-env node*/

(function() {
	function FortyTwo(params) {
		this.params = params || {};

		this.locales = {};
		this.locales.ru = {
			'0': '',
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

		this.parse = function(number, rank) {
			console.log('number', number);
			var result = [];
			if (number.toString().length === 3) {
				var hundred = (~~(number / 100) * 100);
				console.log('parse hundreds', number, '->', hundred);
				//parse hundreds
				result.push(this.locales.ru[hundred]);
				number = number % 100;
			}

			if (number >= 20) {
				console.log('parse >= 20');
				var dozen = (~~(number / 10) * 10);
				result.push(this.locales.ru[dozen]);
				number = number.toString()[1];
			}

			result.push(this.locales.ru[number]);

			if (rank === 1) {
				console.log('thousands');
				result.push(this.locales.ru[1000]);
			}

			return result;
		};
	}



	FortyTwo.prototype.wordify = function(number, locale) {
		number = number.toString();

		locale = locale || 'ru';
		var parts = [];
		var resultParts = [];

		parts = number.toString().match(/.{1,3}/g);

		for (var i = 1; i < number.length; i += 3) {
			var start = number.length - i;
			start = start >= 0 ? start : 0;

			parts.push(number.slice(start, start + 3));
		}
		console.log('parts', parts);
		var rank = parts.length;
		console.log(parts, rank);

		for (var i = 0; i < parts.length; i++) {
			var temp = parts[i];
			resultParts = resultParts.concat(this.parse(temp, rank));
			rank--;
		}

		resultParts = resultParts.filter(Boolean);
		var result = resultParts.join(' ');

		return result;
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