const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');
const activityTrackerListModelBack = require('../models/activitytrackerlistmodel');

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
    const results = await db.promise().query(`SELECT Id,Title,FLOOR(TIMESTAMPDIFF(SECOND, StartTime, StopTime) / 3600) as HourDiff,FLOOR(MOD(TIMESTAMPDIFF(SECOND, StartTime, StopTime),3600)/60) as MinDiff,MOD(MOD(TIMESTAMPDIFF(SECOND, StartTime, StopTime),3600),60) as SecDiff,TaskId FROM ActivityTracker WHERE TaskId='${taskId}'`);
    let lst_activitytracks = [];
    results[0].forEach(record => {
        let newtrack = new activityTrackerListModelBack();
        newtrack.TrackId = record.Id;
        newtrack.Title = record.Title;
        newtrack.HoursSpent = parseFloat(record.HourDiff);
        newtrack.MinSpent = parseFloat(record.MinDiff);
        newtrack.SecSpent = record.SecDiff;
        newtrack.TaskId = record.TaskId;
        lst_activitytracks.push(newtrack);
    });
    response.status(200).send(lst_activitytracks);
});

// Uri: http://localhost:3001/ActivityTrackerController/StartActivityTracker
// Type: POST
// Description: Creates a new ActivityTracker record in DB. This means that the user started recording their time.
router.post('/StartActivityTracker', async (request, response) => {    
    const trackTitle = request.body.Title;
    const trackStart = request.body.StartTime;
    const trackTaskId = request.body.TaskId;
    const trackCreatedBy = "User";
    const trackCreatedDateTime = request.body.StartTime;
    const trackLastUpdatedBy = "User";
    const trackLastUpdatedDateTime = request.body.StartTime;
    const createQuery = 'INSERT INTO ActivityTracker (Title,StartTime,TaskId,CreatedBy,CreatedDateTime,LastUpdatedBy,LastUpdatedDateTime) VALUES (?,?,?,?,?,?,?)';
    const createValues = [trackTitle, trackStart, trackTaskId, trackCreatedBy, trackCreatedDateTime, trackLastUpdatedBy, trackLastUpdatedDateTime];
    db.query(createQuery, createValues, async (error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Error when creating record. Your time has not been recorded.', success: false });
        }
        if (result.affectedRows === 1) {
            const newres = await db.promise().query(`SELECT * FROM ActivityTracker WHERE Id='${result.insertId}'`);
            return response.status(200).json({ message: 'Your time is being recorded!', result: newres[0], success: true });
        }
        else {
            return response.status(500).json({ message: 'Something went wrong. Your time has not been recorded.', success: false });
        }
    });
});

// Uri: http://localhost:3001/ActivityTrackerController/StopActivityTracker
// Type: PUT
// Description: Creates a new ActivityTracker record in DB. This means that the user started recording their time.
router.put('/StopActivityTracker', (request, response) => {    
    const trackId = request.body.Id;
    const trackStopTime = request.body.StopTime;
    const trackLastUpdatedDateTime = request.body.LastUpdatedDateTime;
    const updateQuery = 'UPDATE ActivityTracker SET StopTime=?, LastUpdatedDateTime=? WHERE Id=?';
    const updateValues = [trackStopTime, trackLastUpdatedDateTime, trackId];
    db.query(updateQuery, updateValues, (error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Something went wrong. Your time has not been recorded.', success: false });
        }
        if (result.affectedRows === 1) {
            return response.status(200).json({ message: 'Your time has been recorded!', success: true });
        }
        else {
            return response.status(500).json({ message: 'Something went wrong. Your time has not been recorded.', success: false });
        }
    });
});

module.exports = router;