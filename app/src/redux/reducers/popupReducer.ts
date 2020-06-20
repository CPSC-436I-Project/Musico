import {IPopUpStore} from "../stores";
import initialStore from "../initialStore";

export enum PopUpActionEnum {
	SHOW_POPUP = "SHOW_POPUP",
	HIDE_POPUP = "HIDE_POPUP",
}

const popupReducer = (store: IPopUpStore, action: any) => {
	switch (action.type) {
		case PopUpActionEnum.SHOW_POPUP:
			return {
				popupOpen: true,
			};
		case PopUpActionEnum.HIDE_POPUP:
			return {
				popupOpen: false,
			};
		default:
			return store || initialStore.popupStore;
	}
}

export default popupReducer;
