import {combineReducers} from "redux";
import popupReducer from "./popupReducer";
import chatRoomReducer from "./chatRoomReducer";
import userReducer from "./userReducer";
import songListReducer from "./songListReducer";

export default combineReducers({
	popupStore: popupReducer,
	chatRoomStore: chatRoomReducer,
	userStore: userReducer,
	songListStore: songListReducer,
})
