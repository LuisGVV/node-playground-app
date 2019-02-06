const chai = require('chai');
// Extend Object.prototype with should to enable object chaining
chai.should();

const expect = chai.expect;

const {
    isValidString,
} = require('./validators');

describe(`isValidString`, function isValidStringDescription() {
    it('should not allow empty an empty string or only spaced string', function should() {
        const emptyString = '',
            onlySpacesString = '   ';
        expect(isValidString(emptyString)).to.be.false;
        expect(isValidString(onlySpacesString)).to.be.false;
    });

    it('should allow strings with leading leading or trailing spaces', function should() {
        const trailingSpaceString = 'trailing ',
            leadingSpaceString = ' leading';
        expect(isValidString(trailingSpaceString)).to.be.true;
        expect(isValidString(leadingSpaceString)).to.be.true;
    });
});
