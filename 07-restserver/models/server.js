const express = require('express');
const cors = require('cors');
const sequelize = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.connectDb();

        // this.syncTables();

        // Middlewares (funciones que le agregaran funcionalidad a mi webserver. Siempre se ejecuta cuando levantemos el servidor)
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async connectDb() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async syncTables() {
        sequelize.sync().then(() => {
            console.log('Tables created successfully!');
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
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
            console.log('Server running on port:', this.port);
        });
    }

};

module.exports = Server;