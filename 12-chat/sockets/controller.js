const UserControl = require('../models/user-control');
const { createMessge } = require('../helpers/message');

const userControl = new UserControl();

const socketController = (socket) => {
    // console.log('Cliente conectado', socket.id);

    socket.on('enter-chat', ({ name, room }, callback) => {
        if (!name || !room) {
            return callback({
                ok: false,
                message: 'El nombre/sala es necesario'
            });
        }

        socket.join(room);

        userControl.addUser(socket.id, name, room);

        socket.broadcast.to(room).emit('active-users', userControl.getUserByRoom(room));
        socket.broadcast.to(room).emit('create-message', createMessge('Administrador', `${ name } se unió`));

        callback(userControl.getUserByRoom(room));
    });

    socket.on('create-message', (data, callback) => {
        const user = userControl.getUser(socket.id);
        
        const messageSend = createMessge(user.name, data.message);
        socket.broadcast.to(user.room).emit('create-message', messageSend);

        callback(messageSend);

    });

    socket.on('disconnect', () => {
        // console.log('--> Cliente desconectado', socket.id);
        const deletedUser = userControl.deleteUser(socket.id);
        socket.broadcast.to(deletedUser.room).emit('create-message', createMessge('Administrador', `${deletedUser.name} abandono el chat.`));
        socket.broadcast.to(deletedUser.room).emit('active-users', userControl.getUserByRoom(deletedUser.room));
    });

    // Mensajes privados
    socket.on('private-message', ({ message, from }) => {
        const user = userControl.getUser(socket.id)
        socket.broadcast.to(from).emit('private-message', createMessge(user.name, message));
    });
}

module.exports = {
    socketController
}