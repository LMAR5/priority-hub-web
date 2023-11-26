const { Router, request, response } = require('express');
// Import MySQL connection
const db = require('../database');
const CompletedTasksByDateModel =
  require('../models/completedTasksByDateModel');
const TaskTimeSpentTableModel = require('../models/tasktimespenttablemodel');
const TaskTimeSpentPieModel = require('../models/taskstimespentpiemodel');


const router = Router();

router.use((request, response, next) => {
  console.log('Request made to /Summary route');
  next();
});

const substractDays =
  (inputDate, days) => {
    var date = new Date(inputDate);
    date.setDate(date.getDate() - days);
    return date;
  }

const generateDates =
  (startDate,
    lastDate) => {
    var lstdates = [];
    while (startDate <= lastDate) {
      let tmpDate = new Date(lastDate);
      // tmpDate.setHours(tmpDate.getHours() - 8);
      tmpDate = tmpDate.toISOString();
      lstdates.push(tmpDate);
      lastDate = substractDays(lastDate, 1);
    }
    return lstdates;
  }

router.get('/GetSummaryDateList', (request, response) => {
  const userEmail = request.query.email;
  const userQuery = 'SELECT Id, Email, CreatedDateTime FROM User WHERE email=?';
  const userValues = [userEmail];
  db.query(userQuery, userValues, (error, result) => {
    if (error) {
      return response.status(500).json({
        message: 'Error when getting record. Data was not found.',
        success: false
      });
    }
    if (result.length > 0) {
      const todayDate = new Date();
      var startDate = result[0].CreatedDateTime;
      var list_dates = generateDates(startDate, todayDate);
      return response.status(200).json({
        message: 'List of dates is ready',
        result: list_dates,
        success: true
      });
    } else {
      return response.status(500).json({
        message: 'Something went wrong. The list of dates were not generated.',
        success: false
      });
    }
  });
});

router.get('/GetCompletedTasksByDate', async (request, response) => {
  const startDate = request.query.start;
  const endDate = request.query.end;
  const results = await db.promise().query(`SELECT * FROM task WHERE LastUpdatedDateTime >= '${startDate}' AND LastUpdatedDateTime < '${endDate}' AND Completed = 1 ORDER BY LastUpdatedDateTime`);

  let CompletedTasksByDateTable = [];

  results[0].forEach((element, idx) => {
    let newCompletedTask = new CompletedTasksByDateModel();

    newCompletedTask.Id = element.Id;
    newCompletedTask.Title = element.Title;
    newCompletedTask.CompletedDate = element.LastUpdatedDateTime;
    CompletedTasksByDateTable.push(newCompletedTask);

  });
  response.status(200).send(CompletedTasksByDateTable);
})

router.get('/GetSummaryTimeSpentPieChart', async (request, response) => {
  const startDate = request.query.start;
  const endDate = request.query.end;
  const results = await db.promise().query(`SELECT T.Id as TaskId, T.Title as TaskTitle, SUM(TIMESTAMPDIFF(SECOND, AT.StartTime, AT.StopTime)/3600) as HourDiff FROM Task T INNER JOIN ActivityTracker AT ON AT.TaskId = T.Id WHERE T.Deleted = 0 AND AT.LastUpdatedDateTime >= '${startDate}' AND AT.LastUpdatedDateTime < '${endDate}' GROUP BY T.Id, T.Title ORDER BY T.Id, T.Title`);
  let timeSpentSummaryPieArray = [];
  results[0].forEach((element, idx) => {
    let newRecord = new TaskTimeSpentPieModel();
    newRecord.TaskTitle = element.TaskTitle;
    newRecord.TimeHours = parseFloat(element.HourDiff);
    console.log(newRecord.TaskTitle);
    timeSpentSummaryPieArray.push(newRecord);
  });

  response.status(200).send(timeSpentSummaryPieArray);
})

router.get('/GetSummaryTimeSpentTableData', async (request, response) => {
  const startDate = request.query.start;
  const endDate = request.query.end;
  const results = await db.promise().query(`SELECT T.Id as TaskId, T.Title as TaskTitle, AT.Title as ActivityTitle, SUM(FLOOR(TIMESTAMPDIFF(SECOND, AT.StartTime, AT.StopTime) / 3600)) as HourDiff, SUM(FLOOR(MOD(TIMESTAMPDIFF(SECOND, AT.StartTime, AT.StopTime),3600)/60)) as MinDiff, SUM(MOD(MOD(TIMESTAMPDIFF(SECOND, AT.StartTime, AT.StopTime),3600),60)) as SecDiff FROM Task T INNER JOIN ActivityTracker AT ON AT.TaskId = T.Id WHERE T.Deleted = 0 AND AT.LastUpdatedDateTime >= '${startDate}' AND AT.LastUpdatedDateTime < '${endDate}' GROUP BY T.Id, T.Title, AT.Title ORDER BY T.Id, T.Title, AT.Title`);
  let timeSpentSummaryTableArray = [];
  results[0].forEach((element, idx) => {
    let newRecord = new TaskTimeSpentTableModel();
    newRecord.Id = idx;
    newRecord.TaskId = element.TaskId;
    newRecord.TaskTitle = element.TaskTitle;
    newRecord.ActivityTitle = element.ActivityTitle;
    newRecord.TimeHours = parseFloat(element.HourDiff);
    newRecord.TimeMins = parseFloat(element.MinDiff);
    newRecord.TimeSecs = element.SecDiff;
    timeSpentSummaryTableArray.push(newRecord);
  });

  response.status(200).send(timeSpentSummaryTableArray);
})

module.exports = router;