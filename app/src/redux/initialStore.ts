import {IChatRoomStore, IPopUpStore, ISongListStore, IUserStore, ISidebarStore, IMusicSidebarStore} from "./stores";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {defaultSongs} from "../utility/songs";

export interface IStore {
	popupStore: IPopUpStore;
	chatRoomStore: IChatRoomStore;
	userStore: IUserStore;
	songListStore: ISongListStore;
	sidebarStore: ISidebarStore;
	musicSidebarStore: IMusicSidebarStore;
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
		userId: null,
		username: null,
		password: null,
		email: null,
		profileImgSrc: profilePlaceholder,
	},
	songListStore: {
		songs: defaultSongs
	},
	sidebarStore: {
		sidebarOpen: true
	},
	musicSidebarStore: {
		musicSidebarOpen: true
	}
};
