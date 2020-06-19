import {GenreEnum} from "../components/";

export interface IPopUpStore {
	popupOpen: boolean;
}

export interface IChatRoomStore {
	selectedGenre: GenreEnum | null;
}

export interface IUserStore {
	username: string | null;
	password: string | null;
	email: string | null;
	profileImgSrc: string | null;
}
