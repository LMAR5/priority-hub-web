const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Task route');
    next();
});

// Uri: http://localhost:3001/TaskController/GetAllTasks
// Type: GET
// Description: Get list of all the tasks in DB
router.get('/GetAllTasks', async (request, response) => {
    const results = await db.promise().query(`SELECT * FROM Task`);
    response.status(200).send(results[0]);
});


// Uri: http://localhost:3001/api/TaskController/SearchTask?key=dog
// Type: GET
// Description: Search a task by its name or other fields sending a keyword from frontend
router.get('/SearchTask', async (request, response) => {
    const keyTerm = request.query.key;
    console.log("keyTerm:",keyTerm);
    const results = await db.promise().query(`SELECT * FROM Task WHERE Title like '%${keyTerm}%' OR Description LIKE '%${keyTerm}%'`);
    response.status(200).send(results[0]);
});

// Uri: http://localhost:3001/api/TaskController/GetTaskById?tid=0000000000
// Type: GET
// Description: Get a task entity using by its ID.
router.get('/GetTaskById', async (request, response) => {
    const taskId = request.query.tid;    
    const results = await db.promise().query(`SELECT * FROM Task WHERE Id='${taskId}' and Deleted=0`);
    response.status(200).send(results[0]);
});

module.exports = router;