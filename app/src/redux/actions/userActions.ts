import {UserEnum} from "../reducers/userReducer";

export const setUser = (username: string, email: string, profileImgSrc: string) => {
    return {
        type: UserEnum.SET_USER,
        username: username,
        email: email,
        profileImgSrc: profileImgSrc,
    }
}
