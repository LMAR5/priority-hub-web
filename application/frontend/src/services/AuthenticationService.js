const AuthenticationService = {
    signUp: function (newUserData) {
        const signup = fetch('http://localhost:3001/api/AuthController/SignUp', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then(() => {

            })
    },
    signIn: function (returnUserData) {
        const signin = fetch('http://localhost:3001/api/AuthController/SignIn', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(returnUserData)
        })
            .then(() => {

            })

    },
    signOut: function () {
        // code here
    }
}

export default AuthenticationService;