const { Router } = require('express');
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


// Uri: http://localhost:3001/CategoryController/SearchCategory
// Type: GET
// Description: Search a category by its name or other fields sending a keyword from frontend

module.exports = router;