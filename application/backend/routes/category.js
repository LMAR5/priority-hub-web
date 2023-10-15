const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Category route');
    next();
});

// Uri: http://localhost:3001/CategoryController/GetAllCategories
// Type: GET
// Description: Get list of all the categories in DB
router.get('/GetAllCategories', async (request, response) => {
    const results = await db.promise().query(`SELECT * FROM Category`);
    response.status(200).send(results[0]);
});


// Uri: http://localhost:3001/CategoryController/SearchCategory
// Type: GET
// Description: Search a category by its name or other fields sending a keyword from frontend
router.get('/SearchCategory', async (request, response) => {
    const keyTerm = request.query.key;
    console.log("keyTerm:",keyTerm);
    const results = await db.promise().query(`SELECT * FROM Category WHERE Title like '%${keyTerm}%' OR Description LIKE '%${keyTerm}%'`);
    response.status(200).send(results[0]);
});

module.exports = router;