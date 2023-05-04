import express, { Application } from 'express';
import cors from 'cors';

import personRoutes from '../routes/person';
import sequelize from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private paths = {
        users: '/api/persons',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Conectar a base de datos
        this.connectDb();

        // Middlewares 
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async connectDb() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            throw new Error('Unable to connect to the database: ' + error);
        }
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
        this.app.use(this.paths.users, personRoutes);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}

export default Server;