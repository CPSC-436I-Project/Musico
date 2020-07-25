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
	requests: string[] | null;
	likedSongs: string[] | null;
	favouriteGenres: string[] | null;
	channels: string[] | null;
}

export interface ISongListStore {
	songs: ISongListObject
}

export interface ISidebarStore {
	sidebarOpen: boolean;
}

export interface IMusicSidebarStore {
	musicSidebarOpen: boolean,
	selectedGenre: GenreEnum | null;
}