import {ChatRoomEnum} from "../reducers/chatRoomReducer";
import {GenreEnum} from "../../components/Sidebar";

export const setSelectedGenre = (genre: GenreEnum) => {
	return {
		type: ChatRoomEnum.SET_SELECTED_GENRE,
		genre: genre
	}
}
