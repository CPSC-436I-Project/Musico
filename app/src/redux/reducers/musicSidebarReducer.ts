import {IMusicSidebarStore} from "../stores";
import initialStore from "../initialStore";

export enum MusicSidebarActionEnum {
	SHOW_MUSIC_SIDEBAR = "SHOW_MUSIC_SIDEBAR",
	HIDE_MUSIC_SIDEBAR = "HIDE_MUSIC_SIDEBAR",
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
		default:
			return store || initialStore.musicSidebarStore;
	}
}

export default musicSidebarReducer;