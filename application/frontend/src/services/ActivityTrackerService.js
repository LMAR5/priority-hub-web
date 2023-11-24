const ActivityTrackerService = {
    getAllActivityTrackersByTaskId: function (task_id) {
        const url = '/api/ActivityTrackerController/GetAllActivityTrackersByTaskId?tid=';
        const gettrackers = fetch(process.env.REACT_APP_API_URL.concat(url.concat(task_id)))
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return gettrackers;
    },
    startTrackTime: function (startTrackData) {
        const startTrack = fetch(process.env.REACT_APP_API_URL.concat('/api/ActivityTrackerController/StartActivityTracker'), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(startTrackData)
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return startTrack;
    },
    stopTrackTime: function (stopTrackData) {
        const stopTrack = fetch(process.env.REACT_APP_API_URL.concat('/api/ActivityTrackerController/StopActivityTracker'), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stopTrackData)
        })
            .then(response => response.json())
            .then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        return stopTrack;
    }
}

export default ActivityTrackerService;