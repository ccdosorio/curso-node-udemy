const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 15,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
});

pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    console.log(results);
    if (error) {
        console.log('Hay error: ' + error);
    }
    // if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
});

module.exports = pool;