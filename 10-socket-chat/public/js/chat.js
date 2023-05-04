const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver.herokuapp.com/api/auth';

let user = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');

// Validar el token del LocalStorage
const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': token
        }
    });


    const { user: userDB, token: tokenDB } = await resp.json();

    // Guardar el token renovado
    localStorage.setItem('token', tokenDB);

    user = userDB;

    document.title = user.name;

    await connectSocket();
}

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    // Crear eventos

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets ofline');
    });

    socket.on('receive-messages', drawMessages);

    socket.on('active-users', drawUsers);

    socket.on('private-message', (payload) => {
        console.log('Privado: ', payload);
    });


}

const drawUsers = (users = []) => {

    let usersHtml = '';

    users.forEach(({ name, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `;
    });

    ulUsers.innerHTML = usersHtml;
}

const drawMessages = (messages = []) => {

    let messagesHtml = '';

    messages.forEach(({ message, name }) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}</span>
                    <span>${message}</span>
                </p>
            </li>
        `;
    });

    ulMessages.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', ({ keyCode }) => {

    const message = txtMessage.value;
    const uid = txtUid.value;

    // Tecla enter
    if (keyCode !== 13) return;
    if (message.length === 0) return;

    socket.emit('send-message', { message, uid });
    txtMessage.value = '';

});

const main = async () => {

    await validateJWT();

}

main();
