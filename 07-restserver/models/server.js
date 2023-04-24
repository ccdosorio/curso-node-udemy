const express = require('express');
const cors = require('cors');
const pool = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.connectDb();

        // Middlewares (funciones que le agregaran funcionalidad a mi webserver. Siempre se ejecuta cuando levantemos el servidor)
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async connectDb() {
        // await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }

};

module.exports = Server;