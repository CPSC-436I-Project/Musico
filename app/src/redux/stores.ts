import {GenreEnum} from "../components/";
import {ISongListObject} from "../utility/songs";

export interface IPopUpStore {
	popupOpen: boolean;
}

export interface IChatRoomStore {
	selectedGenre: GenreEnum | null;
	getMessages: boolean;
}

export interface IUserStore {
	userId: string | null;
	username: string | null;
	password: string | null;
	email: string | null;
	profileImgSrc: string | null;
}

export interface ISongListStore {
	songs: ISongListObject
}