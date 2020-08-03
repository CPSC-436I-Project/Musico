import {IRoomStore} from "../stores";
import initialStore from "../initialStore";
import { defaultSong } from "src/utility/songs";

export enum RoomEnum {
	SET_SELECTED_GENRE = "SET_SELECTED_GENRE",
	UNSELECT_GENRE = "UNSELECT_GENRE",
	UPDATE_MESSAGES = "UPDATE_MESSAGES",
	UPDATE_QUEUE = "UPDATE_QUEUE",
	UPDATE_PLAYING = "UPDATE_PLAYING"
}

const roomReducer = (store: IRoomStore, action: any) => {
	switch (action.type) {
		case RoomEnum.SET_SELECTED_GENRE:
			return {
				selectedGenre: action.genre,
				messages: [],
				queue: [],
				currentlyPlaying: defaultSong
			};
		case RoomEnum.UNSELECT_GENRE:
			return {
				selectedGenre: null,
				messages: [],
				queue: [],
				currentlyPlaying: defaultSong
			};
		case RoomEnum.UPDATE_MESSAGES:
			return {
				selectedGenre: store.selectedGenre,
				messages: action.messages,
				queue: store.queue,
				currentlyPlaying: store.currentlyPlaying
			}
		case RoomEnum.UPDATE_QUEUE:
			return {
				selectedGenre: store.selectedGenre,
				messages: store.messages,
				queue: action.queue,
				currentlyPlaying: store.currentlyPlaying
			}
		default:
			return store || initialStore.roomStore;
	}
}

export default roomReducer;
