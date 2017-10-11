const fs = require('fs')
const expect = require('chai').expect
const sinon = require('sinon')

const STR = require('../module/string')
const getInformation = require('../module/getInformation')
const mongodb = require('../module/mongodb')

const OBJ14 = JSON.parse(fs.readFileSync(__dirname + '/data/obj14.json').toString())

// Fake getInformation.getHTML()
const BODY_14 = fs.readFileSync(__dirname + '/data/14.html').toString()
const BODY_HOME = fs.readFileSync(__dirname + '/data/home.html').toString()
let stub = sinon.stub(getInformation, 'getHTML')
stub.withArgs(14).returns(Promise.resolve(BODY_14))
stub.withArgs(13).resolves(BODY_HOME)

// fake mongodb.find()
let stub1 = sinon.stub(mongodb, 'find')
stub1.withArgs('missteen', 'thisinh', {SBD: 14}).resolves([OBJ14])

// mongodb.find()
/*describe('find()', () => {
	it('should return [OBJ14]', () => {
		return mongodb.find('missteen', 'thisinh', {SBD: 14})
			.then( result => {
				expect(result).to.deep.equal([OBJ14])
			})
	})
})*/

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
		expect(STR.standardize(' \n \t\nhồ chí minh')).to.equal('hồ chí minh')
	})
	it('Xoa khoang trang o cuoi', () => {
		expect(STR.standardize('hồ chí minh\t\n  \t')).to.equal('hồ chí minh')
	})
	it('Thay the khoang trang giua cac tu bang 1 dau cach duy nhat', () => {
		expect(STR.standardize('hồ \n chí \t \tminh')).to.equal('hồ chí minh')
	})
})

// STR.standardizeName()
describe('standardizeName()', () => {
	it('Xoa khoang trang o dau', () => {
		expect(STR.standardizeName('  \t\n Hồ Chí Minh')).to.equal('Hồ Chí Minh')
	})
	it('Xoa khoang trang o cuoi', () => {
		expect(STR.standardizeName('Hồ Chí Minh\n \n \t')).to.equal('Hồ Chí Minh')
	})
	it('Thay the khoang trang giua cac tu bang 1 dau cach duy nhat', () => {
		expect(STR.standardizeName('Hồ \n \tChí  \tMinh')).to.equal('Hồ Chí Minh')
	})
	it('Viet hoa chu cai dau moi tu', () => {
		expect(STR.standardizeName('hồ chí minh')).to.equal('Hồ Chí Minh')
	})
	it('Viet thuong chu cai khong bat dau mot tu', () => {
		expect(STR.standardizeName('HỒ ChÍ MiNH')).to.equal('Hồ Chí Minh')
	})
})

// STR.removeVietnamese()
describe('removeVietnamese()', () => {
	it('Bo dau tieng Viet', () => {
		expect(STR.removeVietnamese(' \n hỒ\t cHí Minh ')).to.equal(' \n hO\t cHi Minh ')
	})
})