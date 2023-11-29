const { Router, request } = require('express');
//Import MySQL connection
const db = require('../database');
const taskModelBack = require('../models/taskmodel');
const { getalltasks, getdeltasks, getcomptasks, searchtasks } = require('./taskService');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Task route');
    next();
});

// URI: http://localhost:3001/TaskController/GetAllTasks
// Type: GET
// Description: Get list of all the tasks in DB
router.get('/GetAllTasks', getalltasks);

// URI: http://localhost:3001/TaskController/GetAllDeletedTasks
// Type: GET
// Description: Get list of all deleted tasks in DB
router.get('/GetAllDeletedTasks', getdeltasks);

// URI: http://localhost:3001/TaskController/GetAllCompletedTasks
// Type: GET
// Description: Get list of all completed tasks in DB
router.get('/GetAllCompletedTasks', getcomptasks);

// Uri: http://localhost:3001/api/TaskController/SearchTask?key=dog
// Type: GET
// Description: Search a task by its name or other fields sending a keyword from frontend
router.post('/SearchTask', searchtasks);

// Uri: http://localhost:3001/api/TaskController/GetTaskById?tid=0000000000
// Type: GET
// Description: Get a task entity using by its ID.
router.get('/GetTaskById', async (request, response) => {
    const taskId = request.query.tid;
    let lsttask = [];
    const results = await db.promise().query(`SELECT * FROM Task WHERE Id='${taskId}' and Deleted=0`);
    results[0].forEach(element => {
        let newtask = new taskModelBack();
        newtask.Id = element.Id;
        newtask.Title = element.Title;
        newtask.Description = element.Description;
        newtask.CategoryId = element.CategoryId;
        newtask.UserId = element.UserId;
        newtask.Status = element.Status;
        newtask.Priority = element.Priority;
        newtask.Completed = element.Completed;
        newtask.Deleted = element.Deleted;
        newtask.IsFavorite = element.IsFavorite;
        let tmpDate = new Date(element.DueDate);
        tmpDate.setHours(tmpDate.getHours() - 8);
        newtask.DueDate = tmpDate.toISOString().slice(0, 19);
        newtask.Notes = element.Notes;
        newtask.CreatedBy = element.CreatedBy;
        newtask.CreatedDateTime = element.CreatedDateTime;
        newtask.LastUpdatedBy = element.LastUpdatedBy;
        newtask.LastUpdatedDateTime = element.LastUpdatedDateTime;
        lsttask.push(newtask);
    });
    response.status(200).send(lsttask);
});

// Uri: http://localhost:3001/api/TaskController/CreateTask
// Type: POST
// Description: Insert Task into DB
router.post('/CreateTask', async (request, response) => {
    const TaskName = request.body.TaskName;
    const Description = request.body.TaskDescription;
    const Category = request.body.TaskCategory;
    const DueDate = request.body.TaskDueDate;
    const Notes = request.body.TaskNotes;
    let Createdtmp = new Date(Date.now());
    Createdtmp.setHours(Createdtmp.getHours() - 8);
    let Created = Createdtmp.toISOString().slice(0, 19);

    const createQuery = 'INSERT INTO Task (Title, Description, CategoryID, UserID, Status, Priority, DueDate, Notes, CreatedBy, CreatedDateTime, LastUpdatedBy, LastUpdatedDateTime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    const createValue = [TaskName, Description, Category, 1, 'Pending', 'Low', DueDate, Notes, 'User', Created, 'User', Created];
    const CreateResult = await db.promise().query(createQuery, createValue);
    response.status(201).send(CreateResult[0]);
});

// Uri: http://localhost:3001/api/TaskController/UpdateTask
// Type: PUT
// Description: Update the task based on the values receive from the HTTP request body
router.put('/UpdateTask', async (request, response) => {
    const TaskId = request.body.Id;
    const TaskTitle = request.body.Title;
    const TaskDescription = request.body.Description;
    const TaskCategoryId = request.body.CategoryId;    
    const TaskCompleted = request.body.Completed;    
    const TaskDueDate = request.body.DueDate.slice(0, 19);
    const TaskNotes = request.body.Notes;    
    let nowDateTime = (new Date(Date.now()).toISOString()).slice(0, 19);

    const results = await db.promise().query(`UPDATE Task SET
    Title = '${TaskTitle}',
    Description = '${TaskDescription}',
    CategoryId = ${TaskCategoryId},
    Completed = ${TaskCompleted},
    DueDate = '${TaskDueDate}',
    Notes = '${TaskNotes}',
    LastUpdatedBy = 'User',
    LastUpdatedDateTime = '${nowDateTime}'
    WHERE Id='${TaskId}';`);

    response.status(200).send(results[0]);
});

// Uri: http://localhost:3001/api/TaskController/DeleteTask
// Type: PUT
// Description: Delete a task by updating the "Deleted" field in DB
router.put('/DeleteTask', async (request, response) => {
    const delTaskID = request.body.Id;
    let nowDateTime = (new Date(Date.now()).toISOString()).slice(0, 19);

    const results = await db.promise().query(`UPDATE Task SET    
    Deleted = 1,
    LastUpdatedBy = 'User',
    LastUpdatedDateTime = '${nowDateTime}'
    WHERE Id='${delTaskID}';`);

    response.status(200).send(results[0]);
});


// Uri: http://localhost:3001/api/TaskController/CompleteTask
// Type: PUT
// Description: Complete a task by updating the "Completed" field in DB
router.put('/CompleteTask', async (request, response) => {
    const delTaskID = request.body.Id;
    let nowDateTimetmp = new Date(Date.now());
    nowDateTimetmp.setHours(nowDateTimetmp.getHours() - 8);
    let nowDateTime = nowDateTimetmp.toISOString().slice(0, 19);    

    const results = await db.promise().query(`UPDATE Task SET    
    Completed = 1,
    Status = 'Completed',
    LastUpdatedBy = 'User',
    LastUpdatedDateTime = '${nowDateTime}'
    WHERE Id='${delTaskID}';`);

    response.status(200).send(results[0]);
});

router.put('/UpdateStatusToInProgress', async (request, response) => {
    const taskid = request.body.Id;
    const selectQuery = 'SELECT * FROM ActivityTracker WHERE TaskId=?';
    const selectValues = [taskid];
    db.query(selectQuery, selectValues, async (error, result) => {
        if (error) {
            return response.status(500).json({ message: 'Error when creating record. Your time has not been recorded.', success: false });
        }
        if (result.length === 1) {            
            const newres = await db.promise().query(`UPDATE Task SET Status='In Progress' WHERE Id='${taskid}'`);
            if (newres[0].affectedRows === 1) {
                return response.status(200).json({ message: 'Your task is updated', result: newres[0], success: true });
            } else {
                return response.status(200).json({ message: 'Your task was not updated.', success: true });
            }
        }
        else {
            return response.status(500).json({ message: 'Something went wrong. Your time has not been recorded.', success: false });
        }

    });
});


module.exports = router;