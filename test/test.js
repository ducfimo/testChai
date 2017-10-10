const fs = require('fs')
const expect = require('chai').expect
const sinon = require('sinon')

const STR = require('../module/string')
const getInformation = require('../module/getInformation')
const mongodb = require('../module/mongodb')

const OBJ14 = JSON.parse(fs.readFileSync(__dirname + '/missteen/obj14.json').toString())

// Fake getInformation.getHTML()
const BODY_14 = fs.readFileSync(__dirname + '/missteen/14.html').toString()
const BODY_HOME = fs.readFileSync(__dirname + '/missteen/home.html').toString()
let stub = sinon.stub(getInformation, 'getHTML')
stub.withArgs(14).returns(Promise.resolve(BODY_14))
stub.withArgs(13).returns(Promise.resolve(BODY_HOME))

// fake mongodb.find()
let stub1 = sinon.stub(mongodb, 'find')
stub1.withArgs('missteen', 'thisinh', {SBD: 14}).returns(Promise.resolve([OBJ14]))

// getInformation.readHTML()
describe('readHTML()', () => {
	it('should return 0', () => {
		return getInformation.getHTML(13)
		.then( body => {
			expect(getInformation.readHTML(body)).to.equal(0)
		})
	})
	it('should return an object', () => {
		return getInformation.getHTML(14)
		.then( body => {
			expect(getInformation.readHTML(body)).to.be.an('object')
			expect(getInformation.readHTML(body)).to.deep.equal(OBJ14)
		})
	})
})

// STR.standardize(string)
describe('standardize()', () => {
	it('Xoa khoang trang o dau', () => {
		expect(STR.standardize('  \n	\nha noi')).to.equal('ha noi')
	})
	it('Xoa khoang trang o cuoi', () => {
		expect(STR.standardize('ha noi\n \n 		')).to.equal('ha noi')
	})
	it('Thay the khoang trang giua cac tu bang 1 dau cach duy nhat', () => {
		expect(STR.standardize('ha \n 		\nnoi')).to.equal('ha noi')
	})
})

// STR.standardizeName()
describe('standardizeName()', () => {
	it('Xoa khoang trang o dau', () => {
		expect(STR.standardizeName('  \t\n Ha Noi')).to.equal('Ha Noi')
	})
	it('Xoa khoang trang o cuoi', () => {
		expect(STR.standardizeName('Ha Noi\n \n \t')).to.equal('Ha Noi')
	})
	it('Thay the khoang trang giua cac tu bang 1 dau cach duy nhat', () => {
		expect(STR.standardizeName('Ha \n \t\t	\nNoi')).to.equal('Ha Noi')
	})
	it('Viet hoa chu cai dau moi tu', () => {
		expect(STR.standardizeName('ha noi')).to.equal('Ha Noi')
	})
	it('Viet thuong chu cai khong bat dau mot tu', () => {
		expect(STR.standardizeName('HA NoI')).to.equal('Ha Noi')
	})
})

// STR.removeVietnamese()
describe('removeVietnamese()', () => {
	it('Bo dau tieng Viet', () => {
		expect(STR.removeVietnamese(' \n hà\t nội ')).to.equal(' \n ha\t noi ')
	})
})