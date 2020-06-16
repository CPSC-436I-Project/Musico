import {PopUpActionEnum} from "../reducers";

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
