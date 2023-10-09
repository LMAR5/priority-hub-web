const mysql = require('mysql2');

//console.log('dotenv:',process.env);
//module.exports will allow us to import this file with the DB connection
module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_SCHEMA
});