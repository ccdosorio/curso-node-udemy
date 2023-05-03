const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado!!');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado!!');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;

    const payload = {
        message,
        id: '1',
        date: new Date().getTime()
    }

    socket.emit('send-message', payload, (id) => {

        console.log('Desde el server: ', id);
    });

});

