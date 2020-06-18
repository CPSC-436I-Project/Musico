import {GenreEnum} from "../components/Sidebar";

export interface IPopUpStore {
	popupOpen: boolean;
}

export interface IChatRoomStore {
	selectedGenre: GenreEnum | null;
}
