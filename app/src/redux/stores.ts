import {GenreEnum} from "../components/";
import {ISongListObject} from "../utility/songs";
import { IMessageInterface } from "src/utility/messages";

export interface IPopUpStore {
	popupOpen: boolean;
}

export interface IChatRoomStore {
	selectedGenre: GenreEnum | null;
	messages: IMessageInterface[];
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