import {UserEnum} from "../reducers/userReducer";

export const setUser = (username: string, password: string, email: string, profileImgSrc: string) => {
    return {
        type: UserEnum.SET_USER,
        username: username,
        password: password,
        email: email,
        profileImgSrc: profileImgSrc,
    }
}
