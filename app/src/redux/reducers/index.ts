import {combineReducers} from "redux";
import popupReducer from "./popupReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import sidebarReducer from "./sidebarReducer";
import musicSidebarReducer from "./musicSidebarReducer";

export default combineReducers({
	popupStore: popupReducer,
	roomStore: roomReducer,
	userStore: userReducer,
	sidebarStore: sidebarReducer,
	musicSidebarStore: musicSidebarReducer,
})
