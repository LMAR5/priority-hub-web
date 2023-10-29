const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /ActivityTracker route');
    next();
});

// Uri: http://localhost:3001/ActivityTrackerController/GetAllActivityTrackersByTaskId?tid=
// Type: GET
// Description: Get list of all the activity trackers in DB
router.get('/GetAllActivityTrackersByTaskId', async (request, response) => {
    const taskId = request.query.tid;
    const results = await db.promise().query(`SELECT * FROM ActivityTracker WHERE TaskId='${taskId}'`);
    response.status(200).send(results[0]);
});

module.exports = router;