const DashboardService = {
    //getTasksByCategory


    //getTaskByStatus
    

    //getTasksByDate
    getActivityTrackersByDateChart: function (startDate, endDate) {
        const url = '/api/DashboardController/GetActivityTrackersByDateChart';
        const startString = "?start=".concat(startDate);
        const endString = "&end=".concat(endDate);
        const finalurl = url.concat(startString).concat(endString);
        const tasksdate = fetch(process.env.REACT_APP_API_URL.concat(finalurl))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return tasksdate;
    }
    //getTasksByTimeSpentTable
}

export default DashboardService;