import {IChatRoomStore, IPopUpStore, IUserStore} from "./stores";

export interface IStore {
	popupStore: IPopUpStore;
	chatRoomStore: IChatRoomStore;
	userStore: IUserStore;
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
	},
	userStore: {
		username: null,
        password: null,
		email: null,
		profileImgSrc: null
	}
};
