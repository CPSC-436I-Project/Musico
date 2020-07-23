import LoginScreen from "./LoginScreen";
import {Container} from "./Container";
import Dashboard from "./Dashboard";
import {DebugScreen} from "./TestScreens/DebugScreen";

enum PageEnum {
	LoginScreen,
	Dashboard,
	// ChatRoom,
	// ProfilePage,
}

const pageMap: {[key: string]: { pointer: any, name: string}} = {
	[PageEnum.LoginScreen]: {pointer: LoginScreen, name: "Login Screen"},
	[PageEnum.Dashboard]: {pointer: Dashboard, name: "Dashboard"},
};

export {
	Container, LoginScreen, Dashboard, DebugScreen,
	PageEnum, pageMap,
};
