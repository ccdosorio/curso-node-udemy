class User {

    constructor(id, name, room) {
        this.id = id;
        this.name = name;
        this.room = room;
    }
}

class UserControl {

    constructor() {
        this.users = [];
    }

    get getUsers() {
        return this.users;
    }

    addUser(id, name, room) {
        this.users.push(new User(id, name, room));
        return this.users;
    }

    getUser(id) {
        const user = this.users.filter(user => user.id === id)[0];

        return user;
    }

    getUserByRoom(room) {
        const usersByRoom = this.users.filter(user => user.room === room);
        return usersByRoom;
    }

    deleteUser(id) {

        const deletedUser = this.getUser(id);

        this.users = this.users.filter(user => user.id !== id);

        return deletedUser;
    }

}

module.exports = UserControl;