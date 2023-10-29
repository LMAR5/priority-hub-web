const ActivityTrackerService = {
    getAllActivityTrackersByTaskId: function (task_id){
        const url = '/api/ActivityTrackerController/GetAllActivityTrackersByTaskId?tid=';
        const gettrackers = fetch(process.env.REACT_APP_API_URL.concat(url.concat(task_id)))
        .then(response => response.json())
        .then((data) => {
            return data;
        }).catch((error) => {
            console.log(error.message);
        });
        return gettrackers;
    }
}

export default ActivityTrackerService;