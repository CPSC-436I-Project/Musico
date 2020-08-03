import {GenreEnum} from "../components";

export interface ISongInterface {
    songName: string,
    artists: string[],
    genre: GenreEnum,
    src: string,
    requesterID: any,
    albumCover: string,
    numVotes: number
}


export const defaultSong: ISongInterface = {
    songName: "default",
    artists: [],
    genre: GenreEnum.POP,
    src: "",
    requesterID: "",
    albumCover: "",
    numVotes: 0
}

// export type ISongListObject = {
//     [key in GenreEnum]: ISongInterface[];
// }

// export const defaultSongs: ISongListObject = {
//     [GenreEnum.ASIAN]: [defaultSong],
//     [GenreEnum.BLUES]: [defaultSong],
//     [GenreEnum.CHILDREN]: [defaultSong],
//     [GenreEnum.CHRISTIAN]: [defaultSong],
//     [GenreEnum.CLASSICAL]: [defaultSong],
//     [GenreEnum.COUNTRY]: [defaultSong],
//     [GenreEnum.ELECTRONIC]: [defaultSong],
//     [GenreEnum.HIP_HOP]: [defaultSong],
//     [GenreEnum.INDEPENDENT]: [defaultSong],
//     [GenreEnum.JAZZ]: [defaultSong],
//     [GenreEnum.LATIN_AMERICAN]: [defaultSong],
//     [GenreEnum.OTHER]: [defaultSong],
//     [GenreEnum.POP]: [defaultSong],
//     [GenreEnum.REGGAE]: [defaultSong],
//     [GenreEnum.ROCK]: [defaultSong],
//     [GenreEnum.SOUL]: [defaultSong],
// };