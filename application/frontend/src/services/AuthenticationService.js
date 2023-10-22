const AuthenticationService = {
    signUp: function (user) {
        const signup = fetch('http://localhost:3001/api/AuthController/SignUp', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(() => {

            })
    },
    signIn: function (user) {
        const signin = fetch('http://localhost:3001/api/AuthController/SignIn', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(() => {

            })

    },
    signOut: function () {
        // code here
    }
}

export default AuthenticationService;