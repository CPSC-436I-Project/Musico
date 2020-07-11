import {IChatRoomStore} from "../stores";
import initialStore from "../initialStore";

export enum ChatRoomEnum {
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
}

const chatRoomReducer = (store: IChatRoomStore, action: any) => {
	switch (action.type) {
		case ChatRoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
			};
		case ChatRoomEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
			};
		default:
			return store || initialStore.chatRoomStore;
	}
}

export default chatRoomReducer;
