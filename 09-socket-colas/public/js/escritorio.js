// Refenreicias HTML
const lblDesktop = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParam.get('escritorio');
lblDesktop.innerText = desktop;
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('pending-tickets', (pending) => {
    if (pending === 0) {
        lblPendientes.display = 'none';
    } else {
        lblPendientes.display = '';
        lblPendientes.innerText = pending;
    }
});

btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { desktop }, ({ ok, desktop, message, ticket }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;


    });

});
