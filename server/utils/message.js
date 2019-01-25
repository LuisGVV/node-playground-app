var moment = require('moment');

const generateMsg = function generateMsg(from, text) {
    return {
        from,
        text,
        createdAt: moment().valueOf(),
    };
};

const generateLocationMsg = function generateMsg(from, { latitude, longitude }) {
    return {
        from,
        url: `http://maps.google.com/maps?q=loc:${latitude},${longitude}&z=17`,
        createdAt: moment().valueOf(),
    };
};

module.exports = {
    generateMsg,
    generateLocationMsg,
};
