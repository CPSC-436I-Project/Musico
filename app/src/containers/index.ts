import LoginScreen from "./LoginScreen";
import {Container, IContainerProps} from "./Container";
import Dashboard from "./Dashboard";
import {DebugScreen} from "./TestScreens/DebugScreen";
import Room from "./Room";
import Profile from "./Profile";

enum PageEnum {
    LoginScreen,
    Dashboard,
    Room,
    Profile,
}

const pageMap: { [key: string]: { pointer: any, props: IContainerProps } } = {
    [PageEnum.LoginScreen]: {pointer: LoginScreen, props: {showSidebar: false, showHeader: false}},
    [PageEnum.Dashboard]: {pointer: Dashboard, props: {showSidebar: true, showHeader: true}},
    [PageEnum.Room]: {pointer: Room, props: {showSidebar: true, showHeader: true}},
    [PageEnum.Profile]: {pointer: Profile, props: {showSidebar: true, showHeader: true}},
};

export {
    Container, LoginScreen, Dashboard, DebugScreen,
    PageEnum, pageMap, Room, Profile
};
