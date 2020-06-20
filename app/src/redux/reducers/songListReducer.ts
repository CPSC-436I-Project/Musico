import {defaultSongs} from "../../utility/songs";

export enum SongListEnum {
    ADD_SONG
}

const songListReducer = (state: any, action: any) => {
    switch (action.type) {
        case SongListEnum.ADD_SONG:
            console.log("error ADD_SONG - this should not happen when sidebar item is selected");
            let updatedSongs = state;
            if (updatedSongs[action.genre] !== undefined) {
                updatedSongs[action.genre].push({
                    link: action.link,
                    voteCount: 1,
                    username: action.username
                });
            }
            return updatedSongs;
        default:
            return {
                songs: defaultSongs,
            };
    }
}

export default songListReducer;
