const TaskService = {
    getAllTasks: function() {
        //Perform fetch call here
        //Handle response from backend
    },
    searchTasks: function(searchKey) {
        const url = "http://localhost:3001/api/TaskController/SearchTask?="
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
    }
}

export default TaskService;