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
        const getask = fetch(process.env.REACT_APP_API_URL.concat(url.concat(task_id)))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
    },

    createTask: function (taskData){
        fetch('api/TaskController/CreateTask', {
            method: 'Post',
            body: JSON.stringify(taskData),
          })
      
          .then(response => {
            console.log(response);
          }).catch((error) => {
            console.log(error.message);
          });
    }
}

export default TaskService;