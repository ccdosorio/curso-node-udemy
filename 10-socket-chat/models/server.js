const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const sequelize = require('../database/config.js');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }

        // Conectar a base de datos
        this.connectDb();

        // this.syncTables();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

        // Sockets
        this.sockets();
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
        await sequelize.sync();
        console.log("All models were synchronized successfully.");
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // Crear el directorio si no existe
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }

};

module.exports = Server;