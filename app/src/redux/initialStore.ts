import {IPopUpStore} from "./stores";

export interface IStore {
	popupStore: IPopUpStore;
}

/**
 * Initial values of redux state
 */
export default {
	popupStore: {
		popupOpen: false,
	}
};
