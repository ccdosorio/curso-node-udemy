const express = require('express');
const cors = require('cors');

const sequelize = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search'
        }

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
        await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");
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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }

};

module.exports = Server;