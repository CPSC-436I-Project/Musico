import {combineReducers} from "redux";

export enum PopUpActionEnum {
	SHOW_POPUP,
	HIDE_POPUP,
}

const popupReducer = (popUpOpen: any, action: any) => {
	switch (action.type) {
		case PopUpActionEnum.SHOW_POPUP:
			return {
				popupOpen: true,
			};
		case PopUpActionEnum.HIDE_POPUP:
		default:
			return {
				popupOpen: false,
			};
	}
}

export default combineReducers({
	popupStore: popupReducer,
})
