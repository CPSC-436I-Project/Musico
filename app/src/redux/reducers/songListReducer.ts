import {defaultSongs} from "../../utility/songs";
import {ISongListStore} from "../stores";
import initialStore from "../initialStore";

export enum SongListEnum {
    ADD_SONG = "ADD_SONGS",
    RESET_SONGS = "RESET_SONGS",
}

const songListReducer = (store: ISongListStore, action: any) => {
    switch (action.type) {
        case SongListEnum.ADD_SONG:
            let updatedSongs = store;
            if (updatedSongs[action.genre] !== undefined) {
                updatedSongs[action.genre].push({
                    link: action.link,
                    voteCount: 1,
                    username: action.username
                });
            }
            return updatedSongs;
        case SongListEnum.RESET_SONGS:
            return {
                songs: defaultSongs,
            };
        default:
            return store || initialStore.songListStore;
    }
}

export default songListReducer;
