const _ = require('lodash');

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id = -1) {
        var userToRemove = this.getUser.bind(this)(id);

        if(!_.isUndefined(userToRemove)) {
            _.remove(this.users, {id: userToRemove.id});
        }
        return userToRemove;
    }

    getUser(id = -1) {
        return _.find(this.users, {id});
    }

    getUserList(room = "") {
        return this.users.filter(
            (user) => user.room === room
        ).map(
            ({name}) => name
        );
    }
};

module.exports = {
    Users,
};
