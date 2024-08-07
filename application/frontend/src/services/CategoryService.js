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
    getCategoryById: function (cat_id) {
        const url = '/api/CategoryController/GetCategoryById?cid=';
        const getcategory = fetch(process.env.REACT_APP_API_URL.concat(url.concat(cat_id)))
        .then(response => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error.message);
        });
        return getcategory;
    },
    searchCategory: function (keyTerm) {
        //Perform fetch call here
        //Handle response from backend
        // Uri: http://localhost:3001/api/CategoryController/SearchCategory
        const url = '/api/CategoryController/SearchCategory?key=';
        const Search = fetch(process.env.REACT_APP_API_URL.concat(url.concat(keyTerm)))
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