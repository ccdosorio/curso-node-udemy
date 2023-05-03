const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {


    // Cuando un cliente se conecta
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-state', ticketControl.last4);
    socket.emit('pending-tickets', ticketControl.pendingTickets);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

        // Notificar que hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets);

    });

    socket.on('atender-ticket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                message: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.attendTicket(desktop);

        // Notificar cambio en los ultimos 4
        socket.broadcast.emit('current-state', ticketControl.last4);

        // Actualizar los pendientes
        socket.emit('pending-tickets', ticketControl.pendingTickets);
        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets);

        if (!ticket) {
            callback({
                ok: false,
                message: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });

}

module.exports = {
    socketController
}

