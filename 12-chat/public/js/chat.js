const searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('name') || !searchParam.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios.');
}

const user = {
    name: searchParam.get('name'),
    room: searchParam.get('room')
}

const socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('enter-chat', user, (payload) => {
        // console.log('Usuarios conectados: ', payload);
        renderizarUsuarios(payload)
    });
});

socket.on('create-message', (payload) => {
    renderizarMensajes(payload, false);
    scrollBottom();
});

// Cuando un usuario entra o sale del chat

socket.on('active-users', (payload) => {
    console.log('Usuarios conectados: ', payload);
});

// Mensajes privados
socket.on('private-message', (message) => {
    console.log('Mensaje privado: ', message);
});