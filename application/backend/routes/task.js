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

// 
// Uri: http://localhost:3001/api/TaskController/CreateTask
// Type: POST
// Description: Insert Task into DB
router.get('/CreateTask', async (request, response) => {
   
    const TaskName = request.body.TaskName;
    const Description = request.body.TaskDescription;
    const Category = request.body.TaskCategory;
    const DueDate = request.body.TaskDueDate;
    const Notes = request.body.TaskNotes;
    const Created = request.body.DateCreated;

    const createQuery = 'INSERT INTO Tasks (Title, Description, CategoryID, Status, Priority ,DueDate, Notes, CreatedDateTime, LastUpdatedDateTime) VALUES(?,?,?,?,?,?,?,?,?)';
    const createValue = [TaskName, Description, Category, 'Pending', 'Low', DueDate, Notes, Created, Created];
    query(createQuery, createValue, (err, result) => {
        if(err){
            console.error('Failed to create Task');
            return response.status(500).json({message: 'Failed to create task'});
        };

        if (result.affectedRows === 1) {
            return response.status(201).json({ message: 'Task sucessfuly created' });
        } else {
            return response.status(500).json({ message: 'Task creation Failed' });
        };
    });
});

// Uri: http://localhost:3001/api/TaskController/UpdateTask
// Type: PUT
// Description: Update the task based on the values receive from the HTTP request body
router.put('/UpdateTask', async (request, response) => {
    debugger;
    const TaskId = request.body.Id;
    const TaskTitle = request.body.Title;
    const TaskDescription = request.body.Description;
    const TaskCategoryId = request.body.CategoryId;
    //const TaskUserId = request.body.UserId;
    //const TaskStatus = request.body.Status;
    //const TaskPriority = request.body.Priority;
    const TaskCompleted = request.body.Completed;
    //const TaskDeleted = request.body.Deleted;
    //const TaskIsFavorite = request.body.IsFavorite;
    const TaskDueDate = request.body.DueDate.slice(0,19);
    const TaskNotes = request.body.Notes;
    //const TaskCreatedBy = request.body.CreatedBy;
    //const TaskCreatedDateTime = request.body.CreatedDateTime;
    //const TaskLastUpdatedBy = request.body.LastUpdatedBy;
    //const TaskLastUpdatedDateTime = request.body.LastUpdatedDateTime;
    let nowDateTime = (new Date(Date.now()).toISOString()).slice(0,19);

    const results = await db.promise().query(`UPDATE Task SET
    Title = '${TaskTitle}',
    Description = '${TaskDescription}',
    CategoryId = ${TaskCategoryId},
    Completed = ${TaskCompleted},
    DueDate = '${TaskDueDate}',
    Notes = '${TaskNotes}',
    LastUpdatedBy = 'System',
    LastUpdatedDateTime = '${nowDateTime}'
    WHERE Id='${TaskId}';`);

    response.status(200).send(results[0]);
});

module.exports = router;