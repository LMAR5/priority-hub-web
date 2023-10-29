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
router.post('/SignIn', (request, response) => {
    const emailSignIn = request.body.email;
    const passwordSignIn = request.body.password;

    const queryDB = 'SELECT * FROM User WHERE Email=? AND Password=?';
    const values = [emailSignIn, passwordSignIn];

    db.query(queryDB, values, (err, result) => {
        if (err) {
            return response.status(500).json({ message: 'Duplicate email entry in database', result: [], success: false });
        }

        if (result.length > 0) {
            return response.status(201).json({ message: 'Access granted', result: result[0],  success: true,  token: 'priorityhubtoken123456789' });
        } else {
            return response.status(500).json({ message: 'Invalid credentials', result: [], success: false });
        }
    });
});

// Uri: http://localhost:3001/api/AuthController/SignUp
// Type: Post
// Description: Method to receive the user data from the front end for db
router.post('/SignUp', (request, response, next) => {
    // console.log(request.body);
    const { firstname, lastname, email, password } = request.body;

    if (!firstname || !lastname || !email || !password) {
        return response.status(400).json({ message: 'Missing required data', result: false });
    }

    const insertQuery = 'INSERT INTO User (firstname, lastname, email, password, Status, createdby, lastupdatedby) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [firstname, lastname, email, password, 'ACTIVE','System','System'];

    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error in SignUp route:', err.code);
            return response.status(500).json({ message: 'Duplicate email entry in database', result: false });
        }

        if (result.affectedRows === 1) {
            return response.status(201).json({ message: 'User registered successfully', result: true });
        } else {
            return response.status(500).json({ message: 'Failed to register user', result: false });
        }
    });
});

// Uri: http://localhost:3001/api/AuthController/SignOut
// Type: [pending]
// Description: Method that close the session of the user

// Uri: http://localhost:3001/api/AuthController/ResetPassword
// Type: [pending]
// Description: Method that resets the password of the user

module.exports = router;