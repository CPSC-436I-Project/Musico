import profilePlaceholder from "../../icons/profile-placeholder.png";
import {IUserStore} from "../stores";
import initialStore from "../initialStore";

export enum UserEnum {
    SET_USER= "SET_USER",
    CREATE_USER = "CREATE_USER",
    RESET_USER = "RESET_USER",
}

const userReducer = (store: IUserStore, action: any) => {
    switch (action.type) {
        case UserEnum.SET_USER:
            return {
                username: action.username,
                password: action.password,
                email: action.email,
                profileImgSrc: action.profileImgSrc
            };
        case UserEnum.CREATE_USER:
            return {
                username: action.username,
                password: action.password,
                email: action.email,
                profileImgSrc: profilePlaceholder
            };
        case UserEnum.RESET_USER:
        default:
            return store || initialStore.userStore;
    }
};

export default userReducer;
