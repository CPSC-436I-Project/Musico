import {UserEnum} from "../reducers/userReducer";
import {API_URL} from "src/utility/constants";
import {setCookie, getCookie, deleteCookie} from "src/utility/cookies";

export const setUser = (id: string, username: string, email: string, profilePicture: string,
                        requests: string[], likedSongs: string[], favouriteGenres: string[], channels: string[]) => {
    return {
        type: UserEnum.SET_USER,
        userId: id,
        username: username,
        email: email,
        profilePicture: profilePicture,
        requests: requests,
        likedSongs: likedSongs,
        favouriteGenres: favouriteGenres,
        channels: channels
    }
};

export const updateUser = (url: string, errorCallback: (message: string) => void) => {
    return (dispatch: any) => {
        const token = getCookie('auth-token');
        return fetch(API_URL + "userprofiles/updateProfilePic", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'auth-token': token},
            body: JSON.stringify({profilePictureURL: url})
        })
            .then(async response => {
                return {text: await response.text(), status: response.status}
            })
            .then(res => {
                if (res.status !== 200) {
                    errorCallback(res.text);
                } else {
                    dispatch(receiveUserUpdate(url));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const receiveUserUpdate = (url: string) => {
    return {
        type: UserEnum.UPDATE_USER_RECEIVE,
        profilePicture: url
    }
};

export const invalidUserUpdate = (url: string) => {
    return {
        type: UserEnum.INVALID_USER_UPDATE,
        profilePicture: url
    }
}

export const resetUser = () => {
    return {
        type: UserEnum.RESET_USER
    }
};

export const removeUser = () => {
    return (dispatch: any) => {
        deleteCookie('auth-token');
        dispatch(resetUser());
    }
};

export const createUser = (username: string, email: string, password: string, errorCallback: (message: string) => void) => {
    let newUser = {
        username: username,
        email: email,
        password: password
    };
    return (dispatch: any) => {
        // register the user
        return fetch(API_URL + 'userprofiles/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then(async res => {
                return {text: await res.text(), status: res.status}
            })
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
                        dispatch(setUser(user.id, user.username, user.email, user.profilePicture, user.requests,
                            user.likedSongs, user.favouriteGenres, user.channels));
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
    };
    return (dispatch: any) => {
        // register the user
        return fetch(API_URL + 'userprofiles/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thisUser)
        })
            .then(async res => {
                return {text: await res.text(), status: res.status}
            })
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
                        dispatch(setUser(user.id, user.username, user.email, user.profilePicture, user.requests,
                            user.likedSongs, user.favouriteGenres, user.channels));
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
        return fetch(API_URL + 'userprofiles/getFromToken', {
            method: 'GET',
            headers: {
                'auth-token': token,
            }
        })
            .then(async res => {
                return {json: await res.json(), status: res.status}
            })
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
                        dispatch(setUser(user.id, user.username, user.email, user.profilePicture, user.requests,
                            user.likedSongs, user.favouriteGenres, user.channels));
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
