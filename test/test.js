'use strict';
/*eslint-env node, mocha */

var expect = require('expect.js');
var FortyTwo = require('../dist/forty-two');

var fortyTwo = new FortyTwo();

describe('forty-five', function() {
	it('return something', function () {
		expect(fortyTwo.wordify(1111)).to.be('одна тысяча сто одиннадцать');
		// expect(fortyTwo.wordify(131)).to.be('сто тридцать один');
		// expect(fortyTwo.wordify(100)).to.be('сто');
		// expect(fortyTwo.wordify(32)).to.be('тридцать два');
		// expect(fortyTwo.wordify(11)).to.be('одиннадцать');
		// expect(fortyTwo.wordify(2)).to.be('два');
	});
});

