import { MusicSidebarActionEnum } from "../reducers/musicSidebarReducer";
import { GenreEnum } from "../../components/"

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

export const setSelectedGenre = (genre: GenreEnum) => {
	return {
		type: MusicSidebarActionEnum.SET_SELECTED_GENRE,
		genre: genre
	}
}