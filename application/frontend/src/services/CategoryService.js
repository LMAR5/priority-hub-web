const CategoryService = {
    getAllCategories: function () {
        //Perform fetch call here
        //Handle response from backend
        // Uri: http://localhost:3001/CategoryController/GetAllCategories

        const allcategories = fetch('http://localhost:3001/CategoryController/GetAllCategories')
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
        // Uri: http://localhost:3001/CategoryController/SearchCategory

        const Search = fetch('http://localhost:3001/CategoryController/SearchCategory')
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