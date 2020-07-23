import {IChatRoomStore, IPopUpStore, ISongListStore, IUserStore} from "./stores";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {defaultSongs} from "../utility/songs";

export interface IStore {
	popupStore: IPopUpStore;
	chatRoomStore: IChatRoomStore;
	userStore: IUserStore;
	songListStore: ISongListStore;
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
		messages: [],
	},
	userStore: {
		userId: null,
		username: null,
		email: null,
		profileImgSrc: profilePlaceholder,
		requests: null,
		likedSongs: null,
		favouriteGenres: null,
		channels: null,
	},
	songListStore: {
		songs: defaultSongs
	}
};
