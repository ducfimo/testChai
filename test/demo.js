const expect = require('chai').expect
//const sinon = require('sinon')

function PTBac2(a, b, c) {
	let delta = b*b - 4*a*c
	if (delta<0) return {soNghiem: 0, nghiem: []}
	if (delta==0) return {soNghiem: 1, nghiem: [-b/(2*a)]}
	let temp = Math.sqrt(delta)
	let x1 = (-b - temp)/(2*a)
	let x2 = (-b + temp)/(2*a)
	return {soNghiem: 2, nghiem: [x1, x2]}
}

describe('PTBac2 ', () => {
	it('(1, 2, 3) vo nghiem ', () => {
		expect(PTBac2(1, 2, 3)).to.be.deep.equal({soNghiem: 0, nghiem: []})
	})
	it('(1, 2, 1) 1 nghiem x = -1', () => {
		expect(PTBac2(1, 2, 1)).to.be.deep.equal({soNghiem: 1, nghiem: [-1]})
	})
	it('(1, 2, 0) 2 nghiem x1 = -2, x2 = 0', () => {
		expect(PTBac2(1, 2, 0)).to.be.deep.equal({soNghiem: 2, nghiem: [-2, 0]})
	})
})