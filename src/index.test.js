import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';


describe ('Our first test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should have h1 that says Users', (done) => {
		const index = fs.readFileSync('./src/index.html', "utf-8"); //Places the context of the html file in-memory in the "index" constant

		jsdom.env(index, (err, window) => { //Note: The callback here makes this an async test so you need to use the "done()" method //Pass "index" to jsdom.env to create a virtual DOM in memory
			const h1 = window.document.getElementsByTagName('h1')[0];

			expect(h1.innerHTML).to.equal("Users");
			done(); //Need to tell Mocha the test is done and then it will run the expect
			window.close(); //Close the window to free up the memory that was taken when we created the in-memory DOM
		});
	});
});
