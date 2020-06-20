import {UserEnum} from "../reducers/userReducer";

export const setUser = (username: string, password: string, email: string, profileImgSrc: string) => {
    return {
        type: UserEnum.SET_USER,
        username: username,
        password: password,
        email: email,
        profileImgSrc: profileImgSrc,
    }
};

export const createUser = (username: string, password: string, email: string) => {
    return {
        type: UserEnum.CREATE_USER,
        username: username,
        password: password,
        email: email,
    }
};
