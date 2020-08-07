import {IUserStore} from "../stores";
import initialStore from "../initialStore";

export enum UserEnum {
    SET_USER = "SET_USER",
    RESET_USER = "RESET_USER",
    UPDATE_USER_RECEIVE = "UPDATE_USER_RECEIVE",
    INVALID_USER_UPDATE = "INVALID_USER_UPDATE",
    LIKE_GENRE = "LIKE_GENRE",
    UPDATE_REQUEST_SONG = "UPDATE_REQUEST_SONG",
    ADD_LIKED_SONG = "ADD_LIKED_SONG",
    REMOVE_LIKED_SONG = "REMOVE_LIKED_SONG",
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
        case UserEnum.UPDATE_USER_RECEIVE:
            return {
                ...store,
                profileImgSrc: action.profilePicture
            };
        case UserEnum.LIKE_GENRE:
            return {
                ...store,
                favouriteGenres: action.genres
            };
        case UserEnum.UPDATE_REQUEST_SONG:
            let req = store.requests;
            req.push(action.song);
            return {
                ...store,
                requests: req
            };
        case UserEnum.REMOVE_LIKED_SONG:
            let liked = store.likedSongs;
            const index = liked.indexOf(action.song);
            if (index > -1) {
                liked.splice(index, 1);
            }
            return {
                ...store,
                likedSongs: liked
            };
        case UserEnum.ADD_LIKED_SONG:
            let likedSongs = store.likedSongs;
            likedSongs.push(action.song);
            return {
                ...store,
                likedSongs: likedSongs
            };
        case UserEnum.RESET_USER:
            return initialStore.userStore;
        default:
            return store || initialStore.userStore;
    }
};

export default userReducer;
