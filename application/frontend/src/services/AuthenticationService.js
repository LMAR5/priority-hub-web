const AuthenticationService = {
    signUp: function (newUserData) {
        const signup = fetch(process.env.REACT_APP_API_URL.concat('/api/AuthController/SignUp'), {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                return data;
            }).catch((error) => {
                console.log(error.message);
            })
            return signup;
    },
    signIn: async function (userCredentials) {
        const signInAtempt = await fetch(process.env.REACT_APP_API_URL.concat('/api/AuthController/SignIn'), {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials)
        }).then(response => response.json())
        .then((data) => {
            return data;
        }).catch((error) => {
            console.log(error.message);
        });
        return signInAtempt;
    },
    getToken: function() {
        const tokenString = sessionStorage.getItem('phtoken');
        if (tokenString !== 'undefined'){
            const userToken = JSON.parse(tokenString);
            return userToken?.token;
        }
    },
    setToken: function(userToken) {
        sessionStorage.setItem('phtoken',JSON.stringify(userToken));
    },
    signOut: function () {
        sessionStorage.removeItem('phtoken');
        window.location.reload();
    }
}

export default AuthenticationService;