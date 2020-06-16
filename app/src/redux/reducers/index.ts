import {combineReducers} from "redux";

const popupReducer = (popUpOpen: any, action: any) => {
	switch (action.type) {
		case "SHOW_POPUP":
			return {
				popupOpen: true,
			};
		case "HIDE_POPUP":
		default:
			return {
				popupOpen: false,
			};
	}
}

export default combineReducers({
	popupStore: popupReducer,
})
