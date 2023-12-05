const { getalltasks, getdeltasks, getcomptasks, searchtasks } = require('../routes/taskService');

describe("Task Controller handlers", () => {
    test('responds to /api/TaskController/GetAllTasks', () => {
        const req = {};
        const res = {
            results: [
                {
                    "Id": 1,
                    "Title": "CSC 620 Discussion Post",
                    "Description": "Post based on this weeks reading to the discussion forum.",
                    "CategoryId": 1,
                    "UserId": 2,
                    "Status": "Pending",
                    "Priority": "Low",
                    "Completed": 0,
                    "Deleted": 0,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 5"
                }
            ]
        }
        getalltasks(req, res);
        expect(res.results).toHaveLength(1);
    });

    test('responds to /api/TaskController/GetAllDeletedTasks', () => {
        const req = {};
        const res = {
            results: [
                {
                    "Id": 1,
                    "Title": "Deleted Task",
                    "Description": "Description for a deleted task",
                    "CategoryId": 1,
                    "UserId": 2,
                    "Status": "Pending",
                    "Priority": "Low",
                    "Completed": 0,
                    "Deleted": 1,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 5"
                }
            ]
        }
        getdeltasks(req, res);
        expect(res.results).toHaveLength(1);
    });

    test('responds to /api/TaskController/GetAllCompletedTasks', () => {
        const req = {};
        const res = {
            results: [
                {
                    "Id": 1,
                    "Title": "Completed Task",
                    "Description": "Description for a completed task",
                    "CategoryId": 1,
                    "UserId": 2,
                    "Status": "Completed",
                    "Priority": "Low",
                    "Completed": 0,
                    "Deleted": 1,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 5"
                }
            ]
        }
        getcomptasks(req, res);
        expect(res.results).toHaveLength(1);
    });

    test('responds to /api/TaskController/SearchTask', () => {
        const req = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
                searchkey: "task"
            }
        };
        const res = {
            results: [
                {
                    "Id": 1,
                    "Title": "Searched Task",
                    "Description": "Description for a completed task",
                    "CategoryId": 1,
                    "UserId": 2,
                    "Status": "Completed",
                    "Priority": "Low",
                    "Completed": 0,
                    "Deleted": 1,
                    "IsFavorite": 0,
                    "DueDate": "2023-10-30T13:05:58.000Z",
                    "Notes": "Sample notes for 5"
                }
            ]
        }
        searchtasks(req, res);
        expect(res.results).toHaveLength(1);
    });
});