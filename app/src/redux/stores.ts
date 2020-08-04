import {GenreEnum} from "../components/";
import {ISongInterface} from "../utility/songs";
import { IMessageInterface } from "src/utility/messages";

export interface IPopUpStore {
	popupOpen: boolean;
}

export interface IRoomStore {
	selectedGenre: GenreEnum | null;
	messages: IMessageInterface[];
	queue: ISongInterface[];
	currentlyPlaying: ISongInterface;
	startTime: string | null;
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

export interface ISidebarStore {
	sidebarOpen: boolean;
}

export interface IMusicSidebarStore {
	musicSidebarOpen: boolean,
	selectedGenre: GenreEnum | null;
}