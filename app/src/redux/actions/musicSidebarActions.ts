import { MusicSidebarActionEnum } from "../reducers/musicSidebarReducer";

export const showMusicSidebar = () => {
	return {
		type: MusicSidebarActionEnum.SHOW_MUSIC_SIDEBAR,
	}
}

export const hideMusicSidebar = () => {
	return {
		type: MusicSidebarActionEnum.HIDE_MUSIC_SIDEBAR,
	}
}