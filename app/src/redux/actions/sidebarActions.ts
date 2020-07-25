import { SidebarActionEnum } from "../reducers/sidebarReducer";

export const showSidebar = () => {
	return {
		type: SidebarActionEnum.SHOW_SIDEBAR,
	}
}

export const hideSidebar = () => {
	return {
		type: SidebarActionEnum.HIDE_SIDEBAR,
	}
}