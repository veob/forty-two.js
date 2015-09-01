'use strict';
/*eslint-env node, mocha */

var expect = require('expect.js');
var FortyTwo = require('../dist/forty-two');

var fortyTwo = new FortyTwo();

describe('forty-five', function() {
	it('return something', function () {
		expect(fortyTwo.wordify(13)).to.be('тринадцать');
	});
});

