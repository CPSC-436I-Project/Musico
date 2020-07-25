import {IChatRoomStore} from "../stores";
import initialStore from "../initialStore";

export enum ChatRoomEnum {
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
	UPDATE_MESSAGES = "UPDATE_MESSAGES",
}

const chatRoomReducer = (store: IChatRoomStore, action: any) => {
	switch (action.type) {
		case ChatRoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
				messages: []
			};
		case ChatRoomEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
				messages: []
			};
		case ChatRoomEnum.UPDATE_MESSAGES:
			return {
				selectedGenre: store.selectedGenre,
				messages: action.messages
			}
		default:
			return store || initialStore.chatRoomStore;
	}
}

export default chatRoomReducer;
