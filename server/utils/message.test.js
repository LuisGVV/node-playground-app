const chai = require('chai');
// Extend Object.prototype with should to enable object chaining
chai.should();

const { generateMsg } = require('./message');

describe(`Generate Message`, function generateMessageDescription() {
    it('should generate correct message object', function should() {
        const generatedMessage = generateMsg("Luis","Test message");
        generatedMessage.should.have.property('from');
        generatedMessage.should.have.property('text');
        generatedMessage.should.have.property('createdAt').to.be.a('number', "createdAt property should be a number");
    });
});
