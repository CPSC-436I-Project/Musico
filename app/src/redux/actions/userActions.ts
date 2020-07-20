import {UserEnum} from "../reducers/userReducer";
import { API_URL } from "src/utility/constants";
import { setCookie, getCookie, deleteCookie } from "src/utility/cookies";

export const setUser = (id: string, username: string, email: string, profilePicture: string) => {
    return {
        type: UserEnum.SET_USER,
        userId: id,
        username: username,
        email: email,
        profilePicture: profilePicture,
    }
};

export const resetUser = () => {
    return {
        type: UserEnum.RESET_USER
    }
}

export const removeUser = () => {
    return (dispatch: any) => {
        deleteCookie('auth-token');
        dispatch(resetUser());
    }
}


export const createUser = (username: string, email: string, password: string, errorCallback: (message: string) => void) => {
    let newUser = {
        username: username,
        email: email,
        password: password
    }
    return (dispatch: any) => {
        // register the user
        return fetch(API_URL+'userprofiles/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        .then(async res => { return {text: await res.text(), status: res.status}})
        .then(res => {
            if (res.status !== 200) {
                // TODO: this needs to send an error to the front end
                errorCallback(res.text);
            } else {
                // get the created user
                const user = JSON.parse(res.text);
                if (user) {
                    // store the user token as a cookie
                    setCookie('auth-token', user.token, 70)
                    // set the user in redux to be the current user
                    dispatch(setUser(user.id, user.username, user.email, user.profilePicture));
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export const loginUser = (email: string, password: string, errorCallback: (message: string) => void) => {
    let thisUser = {
        email: email,
        password: password
    }
    return (dispatch: any) => {
        // register the user
        return fetch(API_URL+'userprofiles/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thisUser)
        })
        .then(async res => { return {text: await res.text(), status: res.status}})
        .then(res => {
            if (res.status !== 200) {
                // TODO: this needs to send an error to the front end
                errorCallback(res.text);
            } else {
                // get the created user
                const user = JSON.parse(res.text);
                if (user) {
                    // store the user token as a cookie
                    setCookie('auth-token', user.token, 70)
                    // set the user in redux to be the current user
                    dispatch(setUser(user.id, user.username, user.email, user.profilePicture));
                }
            }  
        })
        .catch(err => {
            console.log(err);
        });
    }
};

export const autoLoginUser = (callback: () => void) => {
    const token = getCookie('auth-token');
    return (dispatch: any) => {
        // register the user
        return fetch(API_URL+'userprofiles/getFromToken', {
            method: 'GET',
            headers: {
                'auth-token': token,
            }
        })
        .then(async res => { return {json: await res.json(), status: res.status}})
        .then(res => {
            if (res.status !== 200) {
                // TODO: this needs to send an error to the front end
                console.log("You have been logged out, please log in!");
                callback();
            } else {
                // get the created user
                const user = res.json;
                if (user) {
                    // set the user in redux to be the current user
                    dispatch(setUser(user.id, user.username, user.email, user.profilePicture));
                } else {
                    console.log("You have been logged out, please log in!");
                    callback();
                }
            }  
        })
        .catch(err => {
            console.log(err);
            callback();
        });
    }
};
