const CategoryService = {
    getAllCategories: function () {
        //Perform fetch call here
        //Handle response from backend
        // Uri: http://localhost:3001/CategoryController/GetAllCategories
        const allcategories = fetch(process.env.REACT_APP_API_URL.concat('/api/CategoryController/GetAllCategories'))
            .then(response => response.json())
            .then((categorydata) => {
                return categorydata;
            }).catch((error) => {
                console.log(error.message);
            })
        return allcategories;

    },
    searchCategory: function () {
        //Perform fetch call here
        //Handle response from backend
        // Uri: http://localhost:3001/api/CategoryController/SearchCategory
        const Search = fetch(process.env.REACT_APP_API_URL.concat('/api/CategoryController/SearchCategory'))
            .then(response => response.json())
            .then((searchdata) => {
                return searchdata;
            }).catch((error) => {
                console.log(error.message);
            })
        return Search;

    }
}

export default CategoryService;