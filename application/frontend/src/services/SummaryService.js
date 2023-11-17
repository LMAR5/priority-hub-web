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
    }
}

export default SummaryService;