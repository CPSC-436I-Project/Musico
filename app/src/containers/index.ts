import LoginScreen from "./LoginScreen";
import {Container} from "./Container";
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

const pageMap: {[key: string]: { pointer: any, name: string}} = {
	[PageEnum.LoginScreen]: {pointer: LoginScreen, name: "Login Screen"},
	[PageEnum.Dashboard]: {pointer: Dashboard, name: "Dashboard"},
	[PageEnum.Room]: {pointer: Room, name: "Room"},
	[PageEnum.Profile]: {pointer: Profile, name: "Profile"}
};

export {
	Container, LoginScreen, Dashboard, DebugScreen,
	PageEnum, pageMap, Room, Profile
};
