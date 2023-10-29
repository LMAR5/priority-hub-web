import { useState } from 'react';

function useToken() {

    const localGetToken = () => {
        const tokenString = sessionStorage.getItem('phtoken');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };

    const [token, setToken] = useState(localGetToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('phtoken', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;