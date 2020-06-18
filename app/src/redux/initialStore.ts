import {IChatRoomStore, IPopUpStore} from "./stores";
import {GenreEnum} from "../components/Sidebar";

export interface IStore {
	popupStore: IPopUpStore;
	chatRoomStore: IChatRoomStore;
}

/**
 * Initial values of redux state
 */
export default {
	popupStore: {
		popupOpen: false,
	},
	chatRoomStore: {
		selectedGenre: null,
	}
};
