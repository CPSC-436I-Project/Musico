import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {Header, Sidebar} from "../components";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {DebugScreen} from "./TestScreens/DebugScreen";
import {GenericScreen} from "./TestScreens/GenericScreen";
import {Profile} from "./Profile";
import Chat from "src/components/Chat";

class Dashboard extends Container {
	public render(): ReactNode {
		return (
			<div id={"dashboard"}>
				<div id={"dashboard_upper"}>
					<Header profileImgSrc={profilePlaceholder} onProfileClick={this.toggleProfile}/>
				</div>
				<div id={"dashboard_lower"}>
					<div id={"dashboard_sidebar"}>
						<Sidebar/>
					</div>
					<div id={"dashboard_display"}>
						{/*{this.state.profileOpen ? <Profile/> : <GenericScreen/>}*/}
						{this.state.profileOpen ? <Profile/> : <DebugScreen/>}
					</div>
				</div>
			</div>
		);
	}
}

export {Dashboard};
