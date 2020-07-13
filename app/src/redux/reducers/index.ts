import {combineReducers} from "redux";
import popupReducer from "./popupReducer";
import chatRoomReducer from "./chatRoomReducer";
import userReducer from "./userReducer";
import songListReducer from "./songListReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
	popupStore: popupReducer,
	chatRoomStore: chatRoomReducer,
	userStore: userReducer,
	songListStore: songListReducer,
	sidebarStore: sidebarReducer
})
