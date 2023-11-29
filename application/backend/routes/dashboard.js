const { Router, request, response } = require('express');
//Import MySQL connection
const db = require('../database');
const TasksByDateChartModel = require('../models/tasksbydatechartmodel');
const TasksByStatusChartModel = require('../models/tasksbystatuschartmodel');
const TaskTimeSpentTableModel = require('../models/tasktimespenttablemodel')

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /DashboardController route');
    next();
});

// Uri: http://localhost:3001/api/DashboardController/GetTasksByCategoryChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

router.get('/GetTasksByCategory', async (request, response) => {
    const startDate = request.query.start;
    const endDate = request.query.end;

    const results = await db.promise().query(`SELECT CategoryId, Category.Title, count(CategoryId) AS TaskCount FROM Task INNER JOIN Category ON CategoryId = Category.Id WHERE Task.Deleted=0 AND Task.CreatedDateTime >= '${startDate}' AND Task.CreatedDateTime < '${endDate}' GROUP BY CategoryId ORDER BY CategoryId`);
    response.status(200).send(results[0]);
});


// Uri: http://localhost:3001/api/DashboardController/GetTasksByStatusChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic

router.get('/GetTasksByStatusChart', async (request, response) => {
    const startDate = request.query.start;
    const endDate = request.query.end;

    const queryResults = await db.promise().query(`SELECT Status as TaskStatus, COUNT(Id) as NumStatus from Task WHERE Deleted=0 AND CreatedDateTime >= '${startDate}' AND CreatedDateTime < '${endDate}' GROUP BY Status ORDER BY Status`);
    // response.status(200).send(queryResults[0]);

    let lstTasksByStatus = [];

    queryResults[0].forEach((element, idx) => {
        let newstatuschart = new TasksByStatusChartModel();
        // newstatuschart.Id = idx;

        newstatuschart.name = element.TaskStatus;
        newstatuschart.StatusNum = element.NumStatus;
        lstTasksByStatus.push(newstatuschart);
    });
    response.status(200).send(lstTasksByStatus);
})




// Uri: http://localhost:3001/api/DashboardController/GetActivityTrackersByDateChart?start=2023-10-30&end=2023-11-12
// Type: GET
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic
router.get('/GetActivityTrackersByDateChart', async (request, response) => {
    //Get thequery parameters sent from the frontend
    const startDate = request.query.start;
    const endDate = request.query.end;
    //Initialize the array that will store the result of the SQL Query
    let lstTrackersByDate = [];
    //SQL query that will bring the number of ActivityTracker records that are between the "start" and "end" dates by Date
    const queryResults = await db.promise().query(`SELECT DATE(CreatedDateTime) as DisplayDate, COUNT(Id) as NumTrackers from ActivityTracker WHERE Deleted=0 AND CreatedDateTime >= '${startDate}' AND CreatedDateTime < '${endDate}' GROUP BY DATE(CreatedDateTime) ORDER BY DATE(CreatedDateTime)`);
    //Map the result of the query (list of sql elements) into a list of type TasksByDateChartModel class.
    queryResults[0].forEach((element, idx) => {
        let newdatechart = new TasksByDateChartModel();
        newdatechart.Id = idx;
        //Required formatting of the Date field
        let tmpdate = new Date(element.DisplayDate);
        newdatechart.DateTitle = tmpdate.toISOString().slice(0, 10);
        newdatechart.TrackerNum = element.NumTrackers;
        lstTrackersByDate.push(newdatechart);
    });
    //After mapping all SQL elements in the list, return this to the frontend
    response.status(200).send(lstTrackersByDate);
});

// Uri: http://localhost:3001/api/DashboardController/GetTasksByTimeSpentChart
// Type: GET or POST
// Description: Method will receive the 2 dates from the frontend, and then use them in their filtering logic
router.get('/GetTasksByTimeSpentChart', async(request, response) => {
    const startDate = request.query.start;
    const endDate = request.query.end;
    const results = await db.promise().query(`SELECT DATE(AT.CreatedDateTime) AS ActivityDate, T.Title AS TaskTitle, SUM(TIMESTAMPDIFF(MINUTE, AT.StartTime, AT.StopTime)) AS TimeSpentMinutes FROM Task T INNER JOIN ActivityTracker AT ON T.Id = AT.TaskId WHERE T.Deleted = 0 AND AT.Deleted = 0 AND AT.CreatedDateTime >= '${startDate}' AND AT.CreatedDateTime < '${endDate}' GROUP BY DATE(AT.CreatedDateTime), T.Title ORDER BY DATE(AT.CreatedDateTime), TimeSpentMinutes DESC;`);
    let timeSpentDashboardTableArray = [];
    results[0].forEach((element, idx) => {
        let newRecord = new TaskTimeSpentTableModel();
        newRecord.Id = idx;
        newRecord.TaskId = element.TaskId;
        newRecord.TaskTitle = element.TaskTitle;
        newRecord.ActivityTitle = element.ActivityTitle;
        newRecord.TimeHours = parseFloat(element.HourDiff);
        newRecord.TimeMins = parseFloat(element.MinDiff);
        newRecord.TimeSecs = element.SecDiff;
        timeSpentDashboardTableArray.push(newRecord);
  });

  response.status(200).send(timeSpentDashboardTableArray);
})

module.exports = router;