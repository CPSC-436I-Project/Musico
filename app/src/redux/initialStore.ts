import {IChatRoomStore, IPopUpStore, ISongListStore, IUserStore, ISidebarStore, IMusicSidebarStore, IRoomStore} from "./stores";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {defaultSongs} from "../utility/songs";

export interface IStore {
	popupStore: IPopUpStore;
	chatRoomStore: IChatRoomStore;
	userStore: IUserStore;
	songListStore: ISongListStore;
	sidebarStore: ISidebarStore;
	musicSidebarStore: IMusicSidebarStore;
	roomStore: IRoomStore;
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
	},
	sidebarStore: {
		sidebarOpen: true
	},
	musicSidebarStore: {
		musicSidebarOpen: true,
		selectedGenre: null,
	},
	roomStore: {
		selectedGenre: null,
	},
};
