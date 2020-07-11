import {IChatRoomStore} from "../stores";
import initialStore from "../initialStore";

export enum ChatRoomEnum {
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
	SET_UPDATE_MESSAGES = "SET_UPDATE_MESSAGES",
}

const chatRoomReducer = (store: IChatRoomStore, action: any) => {
	switch (action.type) {
		case ChatRoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
				getMessages: true
			};
		case ChatRoomEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
				getMessages: false
			};
		case ChatRoomEnum.SET_UPDATE_MESSAGES:
			let curr = store.getMessages
			return {
				selectedGenre: store.selectedGenre,
				getMessages: !curr
			};
		default:
			return store || initialStore.chatRoomStore;
	}
}

export default chatRoomReducer;
