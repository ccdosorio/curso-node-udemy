const myForm = document.querySelector('form');

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver.herokuapp.com/api/auth';

myForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for (let el of myForm.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json())
        .then(({ token, message }) => {
            if (message) {
                return console.log(message);
            }

            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(console.warn);

});

function handleCredentialResponse(response) {
    // Google Token: ID_TOKEN
    // console.log('id_token', response.credential);

    const body = { id_token: response.credential };
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token, user }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('email', user.email);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}

const button = document.getElementById('google_signout');

button.onclick = () => {
    console.log('Hola');
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}