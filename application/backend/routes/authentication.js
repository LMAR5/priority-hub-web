const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /AuthController route');
    next();
});

// Uri: http://localhost:3001/api/AuthController/SignIn
// Type: [pending]
// Description: Method that checks credentials provided by user (input) against DB

// Uri: http://localhost:3001/api/AuthController/SignOut
// Type: [pending]
// Description: Method that close the session of the user

// Uri: http://localhost:3001/api/AuthController/ResetPassword
// Type: [pending]
// Description: Method that resets the password of the user

module.exports = router;