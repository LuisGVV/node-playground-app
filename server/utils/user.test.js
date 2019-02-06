const chai = require('chai');
const _ = require('lodash');

// Extend Object.prototype with should to enable object chaining
chai.should();

const expect = chai.expect;

const { Users } = require('./users');

describe("Users", () => {
    var users = new Users();
    users.users = [
        {
            id: 1,
            name: "Josesito",
            room: "Playground chat",
        },
        {
            id: 2,
            name: "Maria",
            room: "Playground chat",
        },
        {
            id: 3,
            name: "John",
            room: "Playground chat",
        },
        {
            id: 4,
            name: "Joe",
            room: "Work chat",
        },
    ];

    beforeEach(function beforeEach() {
        users = new Users();
        users.users = [
            {
                id: 12,
                name: "John",
                room: "Playground chat",
            },
            {
                id: 23,
                name: "Jake",
                room: "Playground chat",
            },
            {
                id: 34,
                name: "Jack",
                room: "Playground chat",
            },
            {
                id: 54,
                name: "Rick",
                room: "Work chat",
            },
        ];
    })

    it("should add a new user", function shouldAddNewUser() {
        var users = new Users();

        var user = {
            id: 123,
            name: "Juanito",
            room: "The Living Room"
        };

        users.addUser(...Object.values(user));

        users.users.should.deep.equal([user]);
    });

    it("should return the names of users by room id", () => {
        var usersPlaygroundChat = users.getUserList("Playground chat"),
            usersWorkChat = users.getUserList("Work chat");

        expect(usersPlaygroundChat).to.include.members(["John", "Jake", "Jack"]);
        expect(usersWorkChat).to.include.members(["Rick"]);
    });

    it("should remove a user", () => {
        var usersCopy = _.cloneDeep(users.users),
            removedUser = users.removeUser(12),
            userToRemove = {
                id: 12,
                name: "John",
                room: "Playground chat",
            };

        expect(users.users).to.not.include(userToRemove);
        expect(removedUser).to.eql(userToRemove);
        expect(users.users.length).length.to.equal(usersCopy.length - 1);

    });

    it("should not remove a user", () => {
        var usersCopy = _.cloneDeep(users.users),
            failedToRemoveUser = users.removeUser(1230);

        expect(users.users).to.eql(usersCopy);
        expect(failedToRemoveUser).to.be.undefined;
    });

    it("should find a user", () => {
        var Jake = users.getUser(23);

        expect(Jake).to.deep.equal({
            id: 23,
            name: "Jake",
            room: "Playground chat",
        });
    });
    
    it("should not find a user", () => {
        var notFoundUser = users.getUser(123456);

        expect(notFoundUser).to.be.undefined;
    });
});
