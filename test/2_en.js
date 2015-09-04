'use strict';
/*eslint-env node, mocha */

var expect = require('expect.js');
var fortyTwo = require('../dist/forty-two');
var enLocale = require('../locales/en');


describe('English locale', function() {
	before(function() {
		fortyTwo.addLocale('en', enLocale);
		fortyTwo.setDefaultLocale('en');
	});

	it('tests good numbers', function() {
		expect(fortyTwo.wordify('333'))
			.to.be('three hundred thirty-three');

		expect(fortyTwo.wordify(7000000000))
			.to.be('seven billion');

		expect(fortyTwo.wordify(100000001))
			.to.be('one hundred million one');

		expect(fortyTwo.wordify(3000000))
			.to.be('three million');

		expect(fortyTwo.wordify(1234560))
			.to.be(
				'one million two hundred thirty-four thousand ' +
				'five hundred sixty'
			);

		expect(fortyTwo.wordify(123450))
			.to.be('one hundred twenty-three thousand four hundred fifty');

		expect(fortyTwo.wordify(125456))
			.to.be('one hundred twenty-five thousand four hundred fifty-six');

		expect(fortyTwo.wordify(12345))
			.to.be('twelve thousand three hundred forty-five');

		expect(fortyTwo.wordify(1001)).to.be('one thousand one');
		expect(fortyTwo.wordify(131)).to.be('one hundred thirty-one');
		expect(fortyTwo.wordify(100)).to.be('one hundred');
		expect(fortyTwo.wordify(32)).to.be('thirty-two');
		expect(fortyTwo.wordify(11)).to.be('eleven');
		expect(fortyTwo.wordify(2)).to.be('two');
	});
});

