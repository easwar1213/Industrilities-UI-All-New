import { AUTH_LOGIN , AUTH_LOGOUT,AUTH_CHECK, AUTH_ERROR} from 'react-admin';
import { push } from 'react-router-redux';


export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
       // const request = new Request('https://xl1xob5uqg.execute-api.us-east-2.amazonaws.com/dev/login', {
        const request = new Request('https://f594u5uu7j.execute-api.us-east-2.amazonaws.com/dev/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                //console.log(response)
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                   
                }
                return response.json();
            })
            .then((response) => {
              
                localStorage.setItem('token', response.AuthenticationResult.AccessToken);
                localStorage.setItem('username', response.username);
                let username = localStorage.getItem('username');
               // console.log('token :'+username)
            });
    }
        // called when the API returns an error
        if (type === AUTH_ERROR) {
            console.log("AUTH_ERROR")
            console.log(params)
            let { status } = params;
            console.log(status)
            if (status === 401 || status === 403 || status === 400 ||status===404 ||status===502) {
                console.log(status)
                localStorage.removeItem('token');
               
                return Promise.reject();
            }
            return Promise.resolve();
        }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }

        // called when the user navigates to a new location
        if (type === AUTH_CHECK) {
            let { status } = params;
            console.log("AUTH_CHECK")

            console.log(localStorage.getItem('token'))
           // console.log(localStorage.getItem('username'))
            return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' });
        }

    return Promise.resolve();
}