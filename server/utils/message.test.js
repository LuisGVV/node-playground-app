const chai = require('chai');
// Extend Object.prototype with should to enable object chaining
chai.should();

const {
    generateMsg,
    generateLocationMsg,
} = require('./message');

describe(`Generate Message`, function generateMessageDescription() {
    it('should generate correct message object', function should() {
        const generatedMessage = generateMsg("Luis","Test message");
        generatedMessage.should.have.property('from');
        generatedMessage.should.have.property('text');
        generatedMessage.should.have.property('createdAt').to.be.a('number', "createdAt property should be a number");
    });

    it('should generate correct location message object', function should() {
        let user = "Luis",
            latitude = 123,
            longitude = -456;
        const generatedMessage = generateLocationMsg(user, { latitude, longitude });
        generatedMessage.should.have.property('from');
        generatedMessage.should.have.property('url', `http://maps.google.com/maps?q=loc:${latitude},${longitude}&z=17`);
        generatedMessage.should.have.property('createdAt').to.be.a('number', "createdAt property should be a number");
    });
});
