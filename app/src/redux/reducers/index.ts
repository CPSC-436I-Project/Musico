import {combineReducers} from "redux";
import popupReducer from "./popupReducer";

export default combineReducers({
	popupStore: popupReducer,
})
