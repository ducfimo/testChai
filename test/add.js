const chai = require('chai')
const expect = chai.expect

function add(a,b) {
	return new Promise ( (resolve) => resolve(a+b)).then( v => v)
}

describe('add()', () => {
	it('(1,1) should return 2', () => {
		return add(1,1).then( v => {
			expect(v).to.equal(2)
		})
	})
})