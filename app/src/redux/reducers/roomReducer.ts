import {IRoomStore} from "../stores";
import initialStore from "../initialStore";

export enum RoomEnum {
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
}

const roomReducer = (store: IRoomStore, action: any) => {
	switch (action.type) {
		case RoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
				messages: []
			};
		case RoomEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
				messages: []
			};
		default:
			return store || initialStore.roomStore;
	}
}

export default roomReducer;
