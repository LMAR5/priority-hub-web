const SummaryService = {
    getSummaryDateList: function () {
        const tokenString = sessionStorage.getItem('phtoken');
        let userdata = "";
        if (tokenString !== 'undefined') {
            const userToken = JSON.parse(tokenString);
            userdata = userToken.result.Email;
        }
        const url = '/api/SummaryController/GetSummaryDateList?email=';
        const datelist = fetch(process.env.REACT_APP_API_URL.concat(url.concat(userdata)))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return datelist;
    },
    getSummaryTimeSpentPieData: function (startDate, endDate) {
        const url = '/api/SummaryController/GetSummaryTimeSpentPieChart';
        const startString = "?start=".concat(startDate);
        const endString = "&end=".concat(endDate);
        const tabledata = fetch(process.env.REACT_APP_API_URL.concat(url.concat(startString.concat(endString))))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return tabledata;
    },
    getSummaryTimeSpentTableData: function (startDate, endDate) {
        const url = '/api/SummaryController/GetSummaryTimeSpentTableData';
        const startString = "?start=".concat(startDate);
        const endString = "&end=".concat(endDate);
        const tabledata = fetch(process.env.REACT_APP_API_URL.concat(url.concat(startString.concat(endString))))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return tabledata;
    },
    getCompletedTasks: function (startDate, endDate) {
        const url = process.env.REACT_APP_API_URL.concat("/api/TaskController/GetCompletedTasksByDate?date=")
        const startString = "?start=".concat(startDate);
        const endString = "&end=".concat(endDate);
        const completedTasks = fetch(process.env.REACT_APP_API_URL.concat(url.concat(startString.concat(endString))))
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return completedTasks;
    }

}

export default SummaryService;