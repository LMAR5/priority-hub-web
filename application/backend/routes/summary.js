const { Router, request, response } = require('express');
// Import MySQL connection
const db = require('../database');
const CompletedTasksByDateModel = require('../models/completedTasksByDateModel')

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
  (startDate, lastDate) => {
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

router.get('/GetCompletedTasksByDate', async(request,response) => {
  const summaryDate = request.query.date;
  const results = await db.promise.query(`SELECT * FROM task WHERE LastUpdatedDateTime LIKE '${summaryDate}%' AND Completed = 1 ORDER BY LastUpdatedDateTime`);

  let CompletedTasksByDate = [];

  results[0].foreach((element, idx) => {
    let newCompletedTask = new CompletedTasksByDateModel();

    newCompletedTask.ID = element.Id;
    newCompletedTask.Title = element.Title;
    newCompletedTask.CompletedDate = element.LastUpdatedDateTime;
    CompletedTasksByDate.push(newCompletedTask);
    
    response.status(200).send(newCompletedTask);
  }); 
})

module.exports = router;