import {IUserStore} from "../stores";
import initialStore from "../initialStore";

export enum UserEnum {
    SET_USER = "SET_USER",
    RESET_USER = "RESET_USER"
}

const userReducer = (store: IUserStore, action: any) => {
    switch (action.type) {
        case UserEnum.SET_USER:
            return {
                userId: action.userId,
                username: action.username,
                email: action.email,
                profileImgSrc: action.profilePicture,
                requests: action.requests,
                likedSongs: action.likedSongs,
                favouriteGenres: action.favouriteGenres,
                channels: action.channels
            };
        case UserEnum.RESET_USER:
            return initialStore.userStore;
        default:
            return store || initialStore.userStore;
    }
};

export default userReducer;
