export enum PopUpActionEnum {
	SHOW_POPUP,
	HIDE_POPUP,
}

const popupReducer = (popUpOpen: any, action: any) => {
	switch (action.type) {
		case PopUpActionEnum.SHOW_POPUP:
			console.log("error SHOW_POPUP - this should not happen when sidebar item is selected");
			return {
				popupOpen: true,
			};
		case PopUpActionEnum.HIDE_POPUP:
		default:
			console.log("error HIDE_POPUP - this should not happen when sidebar item is selected");
			return {
				popupOpen: false,
			};
	}
}

export default popupReducer;
