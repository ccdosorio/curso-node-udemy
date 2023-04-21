// setTimeout(() => {
//     console.log('Hola mundo');
// }, 1000);

const getUsuarioByID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Christian'
    }

    setTimeout(() => {
        callback(usuario);
    }, 1500);
}

getUsuarioByID(10, (usuario) => {
    console.log(usuario);
})