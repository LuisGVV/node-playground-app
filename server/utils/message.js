const generateMsg = function generateMsg(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime(),
    };
};

const generateLocationMsg = function generateMsg(from, { latitude, longitude }) {
    return {
        from,
        url: `http://maps.google.com/maps?q=loc:${latitude},${longitude}&z=17`,
        createdAt: new Date().getTime(),
    };
};

module.exports = {
    generateMsg,
    generateLocationMsg,
};
