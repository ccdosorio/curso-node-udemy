const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 15,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const dbConnection = async () => {
    try {
        pool.query('SELECT 1 + 1 AS solution', (error, results) => {
            if (error) throw error;
            console.log('Se realizo la conexion a la base de datos exitosamente.', results[0].solution);
        });
    } catch (error) {
        throw new Error('Error de conexion de base de datos');
    }
}

module.exports = {
    dbConnection
}