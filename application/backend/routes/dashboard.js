const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /DashboardController route');
    next();
});

// Uri: http://localhost:3001/api/DashboardController/GetTasksByCategoryChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

// Uri: http://localhost:3001/api/DashboardController/GetTasksByStatusChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

// Uri: http://localhost:3001/api/DashboardController/GetTasksByDateChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

// Uri: http://localhost:3001/api/DashboardController/GetTasksByTimeSpentChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

module.exports = router;