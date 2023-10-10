const GenericService = {
    getCheckStatus: function (){
        const checkstatus = fetch(process.env.REACT_APP_API_URL.concat('/api/GenericController/GetStatusCheck'))
        .then(response => response.json())
        .then((data) => {
            return data;
        }).catch((error) => {
            console.log(error.message);
        });
        return checkstatus;
    }
}

export default GenericService;