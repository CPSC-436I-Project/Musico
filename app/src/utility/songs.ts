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
    [GenreEnum.ELECTRONIC]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.ROCK]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.LO_FI]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.REGGAE]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.COUNTRY]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.HIP_HOP]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.JAZZ]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.RAP]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ],
    [GenreEnum.CLASSICAL]: [
        {link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", voteCount: 1, submittor: "default"}
    ]
};