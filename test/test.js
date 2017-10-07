const expect = require('chai').expect

const STR = require('../module/string')

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