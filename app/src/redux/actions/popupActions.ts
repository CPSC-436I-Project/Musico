import {PopUpActionEnum} from "../reducers/popupReducer";

export const showPopUp = () => {
	return {
		type: PopUpActionEnum.SHOW_POPUP,
	}
}

export const hidePopUp = () => {
	return {
		type: PopUpActionEnum.HIDE_POPUP,
	}
}
