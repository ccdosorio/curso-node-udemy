const http = require('http');

const server = http.createServer((req, res) => {

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // res.writeHead(200, { 'Content-Type': 'application/csv' });

    // const persona = {
    //     id: 1,
    //     nombre: 'Christian'
    // };

    // res.write(JSON.stringify(persona));
    // res.write('id, nombre\n');
    // res.write('1, Christian\n');
    // res.write('2, David\n');
    res.write('Hola Mundo');
    res.end();
});

server.listen(8080);

console.log('Escuando en el puerto: ', 8080);