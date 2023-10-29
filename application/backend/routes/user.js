const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /UserController route');
    next();
});


// Uri: http://localhost:3001/api/UserController/GetUsers
// Type: GET
// Description: Methods that checks get the list of users in DB

// Uri: http://localhost:3001/api/UserController/GetUserById
// Type: GET
// Description: Methods that gets a user by its ID.

// Uri: http://localhost:3001/api/UserController/RegisterUser
// Type: POST
// Description: Methods that creates a user



module.exports = router;