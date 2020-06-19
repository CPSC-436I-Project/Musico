import {IChatRoomStore, IPopUpStore} from "./stores";

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
