import {ISidebarStore} from "../stores";
import initialStore from "../initialStore";

export enum SidebarActionEnum {
    SHOW_SIDEBAR = "SHOW_SIDEBAR",
    HIDE_SIDEBAR = "HIDE_SIDEBAR",
}

const sidebarReducer = (store: ISidebarStore, action: any) => {
    switch (action.type) {
        case SidebarActionEnum.SHOW_SIDEBAR:
            return {
                sidebarOpen: true,
            };
        case SidebarActionEnum.HIDE_SIDEBAR:
            return {
                sidebarOpen: false,
            };
        default:
            return store || initialStore.sidebarStore;
    }
};

export default sidebarReducer;
