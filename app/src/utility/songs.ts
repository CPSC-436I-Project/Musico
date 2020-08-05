import {GenreEnum} from "../components";

export interface ISongInterface {
    songName: string,
    genre: GenreEnum,
    src: string,
    duration: number,
    requesterID: any,
    albumCover: string,
    numVotes: number
}


export const defaultSong: ISongInterface = {
    songName: "default",
    genre: GenreEnum.POP,
    src: "",
    duration: 10,
    requesterID: "",
    albumCover: "",
    numVotes: 0
}
