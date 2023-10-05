const GenericService = {
    getCheckStatus: function (){
        const checkstatus = fetch('http://localhost:3001/GenericController/GetStatusCheck')
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