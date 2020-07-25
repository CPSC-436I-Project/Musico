import {GenreEnum} from "../components";

export interface ISongInterface {
    link: string;
    voteCount: number;
    submittor: string;
}

// export type ISongListMap<GenreEnum, ISongInterface[]>;

export type ISongListObject = {
    [key in GenreEnum]: ISongInterface[];
}

export const defaultSongs: ISongListObject = {
    [GenreEnum.ASIAN]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.BLUES]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.CHILDREN]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ], 
    [GenreEnum.CHRISTIAN]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.CLASSICAL]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.COUNTRY]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.ELECTRONIC]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.HIP_HOP]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.INDEPENDENT]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.JAZZ]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.LATIN_AMERICAN]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.OTHER]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.POP]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.REGGAE]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.ROCK]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ], 
    [GenreEnum.SOUL]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ], 
};