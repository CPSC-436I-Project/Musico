import {IMusicSidebarStore} from "../stores";
import initialStore from "../initialStore";

export enum MusicSidebarActionEnum {
	SHOW_MUSIC_SIDEBAR = "SHOW_MUSIC_SIDEBAR",
	HIDE_MUSIC_SIDEBAR = "HIDE_MUSIC_SIDEBAR",
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
}

const musicSidebarReducer = (store: IMusicSidebarStore, action: any) => {
	switch (action.type) {
		case MusicSidebarActionEnum.SHOW_MUSIC_SIDEBAR:
			return {
				musicSidebarOpen: true,
			};
		case MusicSidebarActionEnum.HIDE_MUSIC_SIDEBAR:
			return {
				musicSidebarOpen: false,
			};
		case MusicSidebarActionEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
			};
		case MusicSidebarActionEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
			};
		default:
			return store || initialStore.musicSidebarStore;
	}
}

export default musicSidebarReducer;