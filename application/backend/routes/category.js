const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');
const categoryModel = require('../models/categorymodel');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Category route');
    next();
});

// Uri: http://localhost:3001/CategoryController/GetAllCategories
// Type: GET
// Description: Get list of all the categories in DB
router.get('/GetAllCategories', async (request, response) => {
    let lstcategories = [];
    let newcat = new categoryModel();
    newcat.Id = 0;
    newcat.Title = "Select category"
    newcat.Description = "Select category";
    newcat.CreatedBy = "System";
    newcat.LastUpdatedBy = "System";
    lstcategories.push(newcat);
    const results = await db.promise().query(`SELECT * FROM Category WHERE Deleted=0`);
    results[0].forEach(element => {
        lstcategories.push(element);
    });
    response.status(200).send(lstcategories);
});

// Uri: http://localhost:3001/CategoryController/GetCategoryById?cid=12345
// Type: GET
// Description: Get category by Id
router.get('/GetCategoryById', async (request, response) => {
    const catId = request.query.cid;
    const results = await db.promise().query(`SELECT * FROM Category WHERE Id='${catId}' and Deleted=0`);
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