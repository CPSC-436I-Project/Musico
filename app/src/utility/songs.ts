import {GenreEnum} from "../components";

export interface ISongInterface {
    songName: string,
    genre: GenreEnum,
    src: string,
    requesterID: any,
    albumCover: string,
    numVotes: number
}


export const defaultSong: ISongInterface = {
    songName: "default",
    genre: GenreEnum.POP,
    src: "",
    requesterID: "",
    albumCover: "",
    numVotes: 0
}
