const { checkJWT } = require("../helpers");
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async (socket, io) => {
    // console.log('Cliente conectado: ', socket.id);

    const token = socket.handshake.headers['x-token'];
    const user = await checkJWT(token);

    if (!user) {
        return socket.disconnect();
    }

    // console.log('Se conecto: ', user.name);

    // Agregar el usuario conectado
    chatMessages.connectUser(user);
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('receive-messages', chatMessages.last10);

    // Conectarlo a una sala especial
    socket.join(user.uid); // Salas: global, socket.id, user.uid

    // Limpiar cuando alguien se desconect
    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.uid);
        io.emit('active-users', chatMessages.usersArr);
    });

    socket.on('send-message', ({ message, uid = 0}) => {
        
        if (uid !== 0) {
            // Mensaje privado
            socket.to(ui).emit('private-message', { from: user.name, message });
        } else {
            chatMessages.sendMessage(user.uid, user.name, message);
            io.emit('receive-messages', chatMessages.last10);
        }

    });

}

module.exports = {
    socketController
}