import {combineReducers} from "redux";
import popupReducer from "./popupReducer";
import chatRoomReducer from "./chatRoomReducer";
import userReducer from "./userReducer";

export default combineReducers({
	popupStore: popupReducer,
	chatRoomStore: chatRoomReducer,
	userStore: userReducer,
})
