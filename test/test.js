'use strict';
/*eslint-env node, mocha */

var expect = require('expect.js');
var FortyTwo = require('../dist/forty-two');

var fortyTwo = new FortyTwo();

describe('forty-five', function() {

	it('return something', function () {

		expect(fortyTwo.wordify(100000001))
					.to.be('сто миллионов один');

		expect(fortyTwo.wordify(3000000))
					.to.be('три миллиона');

		expect(fortyTwo.wordify(1234560))
					.to.be('один миллион двести тридцать четыре тысячи пятьсот шестьдесят');

		expect(fortyTwo.wordify(123456))
					.to.be('сто двадцать три тысячи четыреста пятьдесят шесть');

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
});

