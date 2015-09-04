'use strict';
/*eslint-env node, mocha */

var expect = require('expect.js');
var fortyTwo = require('../dist/forty-two');

describe('forty-five', function() {

	it('tests good numbers', function() {
		expect(fortyTwo.wordify('333'))
					.to.be('триста тридцать три');

		expect(fortyTwo.wordify(7000000000))
					.to.be('семь миллиардов');

		expect(fortyTwo.wordify(100000001))
					.to.be('сто миллионов один');

		expect(fortyTwo.wordify(3000000))
					.to.be('три миллиона');

		expect(fortyTwo.wordify(1234560))
					.to.be('один миллион двести тридцать четыре' +
										' тысячи пятьсот шестьдесят');

		expect(fortyTwo.wordify(123450))
					.to.be('сто двадцать три тысячи четыреста пятьдесят');

		expect(fortyTwo.wordify(125456))
					.to.be('сто двадцать пять тысяч четыреста пятьдесят шесть');

		expect(fortyTwo.wordify(12345))
					.to.be('двенадцать тысяч триста сорок пять');

		expect(fortyTwo.wordify(1001)).to.be('одна тысяча один');
		expect(fortyTwo.wordify(131)).to.be('сто тридцать один');
		expect(fortyTwo.wordify(100)).to.be('сто');
		expect(fortyTwo.wordify(32)).to.be('тридцать два');
		expect(fortyTwo.wordify(11)).to.be('одиннадцать');
		expect(fortyTwo.wordify(2)).to.be('два');
	});

	it('tests bad numbers', function () {
		expect(fortyTwo.wordify).withArgs('foo').to.throwException();
		expect(fortyTwo.wordify).withArgs('123qssad').to.throwException();
		expect(fortyTwo.wordify).withArgs('123,123').to.throwException();
	});

	it('tests float numbers', function() {
		expect(fortyTwo.wordify(123.456)).to.be('сто двадцать три');
	});

	it('tests adding locale', function() {
		fortyTwo.addLocale('en', {
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
				'', '', 'twenty', 'thirdy', 'fourty', 'fifty',
				'sixty', 'seventy', 'eighty', 'ninety'
			],
			'hundreds': [
				'', 'one hundred', 'two hundred', 'three hundred',
				'four hundred', 'five hundred', 'six hundred', 'seven hundred',
				'eight hundred', 'nine hundred'
			],
			'tenInPower': {
				'3': {pluralForms: ['thousand', 'thousands', 'thousands']},
				'6': {pluralForms: ['million', 'millions', 'millions']},
				'9': {pluralForms: ['billion', 'billions', 'billions']},
				'12': {pluralForms: ['trillion', 'trillions', 'trillions']}
			}
		});

		expect(fortyTwo.wordify(2, 'en')).to.be('two');
		expect(fortyTwo.wordify(123, 'en')).to.be('one hundred twenty three');
		expect(fortyTwo.wordify(11009, 'en')).to.be('eleven thousands nine');
	});
});

