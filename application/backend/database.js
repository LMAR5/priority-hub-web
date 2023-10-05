const mysql = require('mysql2');

//module.exports will allow us to import this file with the DB connection
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Database123#',
    database: 'PrototypeDB'
});