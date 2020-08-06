import {IRoomStore, IPopUpStore, IUserStore, ISidebarStore, IMusicSidebarStore} from "./stores";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {defaultSong} from "../utility/songs";

export interface IStore {
	popupStore: IPopUpStore;
	roomStore: IRoomStore;
	userStore: IUserStore;
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
	roomStore: {
		selectedGenre: null,
		messages: [],
		queue: [defaultSong],
		currentlyPlaying: defaultSong,
		startTime: null
	},
	userStore: {
		userId: null,
		username: null,
		email: null,
		profileImgSrc: profilePlaceholder,
		requests: [],
		likedSongs: [],
		favouriteGenres: [],
		channels: null,
	},
	sidebarStore: {
		sidebarOpen: true
	},
	musicSidebarStore: {
		musicSidebarOpen: true,
		selectedGenre: null,
	}
};
