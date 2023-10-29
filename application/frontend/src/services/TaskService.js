const TaskService = {
    getAllTasks: function () {
        //Perform fetch call here
        //Handle response from backend
        const alltasks = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/GetAllTasks'))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return alltasks;
    },
    searchTasks: function (searchKey) {
        const url = process.env.REACT_APP_API_URL.concat("/api/TaskController/SearchTask?key=")
        const searchResult = fetch(url.concat(searchKey))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        //Perform fetch call here
        //Handle response from backend
        return searchResult;
    },
    getTaskById: function (task_id) {
        const url = process.env.REACT_APP_API_URL.concat("/api/TaskController/GetTaskById?tid=")
        const get_task = fetch(url.concat(task_id))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return get_task;
    },
    createTask: function (taskData) {
        const create = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/CreateTask'), {
            method: 'Post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return create;
    },
    updateTask: function (taskUpdData) {
        const taskupd = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/UpdateTask'), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskUpdData)
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return taskupd;
    },
    deleteTask: function (delTaskData) {
        const deltask = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/DeleteTask'), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(delTaskData)
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return deltask;
    },
    getDeletedTask: function () {
        const alldeltasks = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/GetAllDeletedTasks'))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return alldeltasks;
    },
    getCompletedTask: function () {
        const allcompltasks = fetch(process.env.REACT_APP_API_URL.concat('/api/TaskController/GetAllCompletedTasks'))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return allcompltasks;
    }

}

export default TaskService;