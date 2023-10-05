const { Router } = require('express');
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


// Uri: http://localhost:3001/TaskController/SearchTask
// Type: GET
// Description: Search a task by its name or other fields sending a keyword from frontend

module.exports = router;