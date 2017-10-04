const chai = require('chai')
const expect = chai.expect

const MDB = require('../module_mongodb')
const STR = require('../module_string')
const VN = require('../module_tiengViet')
const getInfo = require('../getData').getInformation


describe('getData()', () => {
	for(let i=300;i<305;i++) {
		it(`${i} `, () => {
			return getInfo(i).then( (result) => {
				if(!isNaN(result)) {
					expect(result).to.be.equal(0)	
				} else {
					expect(result).to.be.an('object')
					return MDB.find('missteen', 'thisinh', {SBD: i}).then( res => {
						expect(res).to.be.an('array')
						expect(res[0]).to.be.deep.equal(result)
						//expect(1).to.be.equa(0)
					})
				}
			})
		})
	}
})

describe('standardize()', () => {
	it('test', () => {
		expect(STR.standardize('\n test	 ')).to.be.equal('test')
		expect(STR.standardize('\n test		 test\n ')).to.be.equal('test test')
		expect(STR.standardize(' 	ha\n   noi		')).to.be.equal('ha noi')
	})
})

describe('standardizeName()', () => {
	it('OK', () => {
		expect(STR.standardizeName('\n	hà   Nội \n ')).to.be.equal('Hà Nội')
		expect(STR.standardizeName('hưNg yÊN')).to.be.equal('Hưng Yên')
		expect(STR.standardizeName(' hO chi   mInH ')).to.be.equal('Ho Chi Minh')
	})
})

describe('removeVeVietnamese()', () => {
	for(let i=60;i<65;i++) {
		it(`${i} `, () => {
			return MDB.find('missteen','thisinh', {SBD: i}).then( (result) => {
				//expect(result).to.be.an('array')
				//expect(result).to.have.lengthOf.within(0,5)
				if(result.length) {
					expect(VN.removeVietnamese(result[0].Ten)).to.be.equal(result[0].TenKhongDau)
				}
			})
		})
	}
})

/*let res
describe('removeVeVietnamese()', () => {
	before( () => {
		return MDB.find('missteen','thisinh',{}).then( result => {
			res = result
		})
	})
	
	it('test', () => {
		for(let i=0;i<res.length;i++) {
			expect(VN.removeVietnamese(res[i].Ten), `${i}`).to.equal(res[i].TenKhongDau)	
		}
	})
})*/

