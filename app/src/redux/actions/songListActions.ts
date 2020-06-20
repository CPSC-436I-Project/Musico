import {SongListEnum} from "../reducers/songListReducer";
import {GenreEnum} from "../../components";


export const addSong = (username: string, link: string, genre: GenreEnum) => {
    return {
        type: SongListEnum.ADD_SONG,
        genre: genre,
        username: username,
        link: link
    }
}
