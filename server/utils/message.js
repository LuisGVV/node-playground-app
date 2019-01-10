const generateMsg = function generateMsg(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getDate(),
    };
};

module.exports = {
    generateMsg,
};
