// Refenreicias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('last-ticket', (last) => {
    setTimeout(() => {
        lblNuevoTicket.innerText = 'Ticket ' + last;
    }, 500);
});


btnCrear.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});
