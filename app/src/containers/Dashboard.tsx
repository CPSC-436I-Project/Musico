import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {Header, Sidebar} from "../components";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {DebugScreen} from "./TestScreens/DebugScreen";
import {GenericScreen} from "./TestScreens/GenericScreen";
import {Profile} from "./Profile";

class Dashboard extends Container {
	public render(): ReactNode {
		return (
			<div
				// className={"fill-container"}
			>
				<div>
					<Header profileImgSrc={profilePlaceholder} onProfileClick={this.toggleProfile}/>
				</div>
				<div>
					<div style={{position: "absolute"}}>
						<Sidebar/>
					</div>
					<div className={"flex-column-center"} style={{marginLeft: 200}}>
						{/*{this.state.profileOpen ? <Profile/> : <DebugScreen/>}*/}
						{this.state.profileOpen ? <Profile/> : <GenericScreen/>}
					</div>
				</div>
			</div>
		);
	}
}

export {Dashboard};
