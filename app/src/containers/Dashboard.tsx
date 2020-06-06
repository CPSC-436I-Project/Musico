import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {Header, Image, Sidebar} from "../components";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {DebugScreen} from "./TestScreens/DebugScreen";

class Dashboard extends Container {
	public render(): ReactNode {
		return (
			<div
				// className={"fill-container"}
			>
				<div>
					<Header profileImgSrc={profilePlaceholder}/>
				</div>
				<div>
					<div style={{position: "absolute"}}>
						<Sidebar/>
					</div>
					<div className={"flex-column-center"} style={{marginLeft: 200}}>
						<DebugScreen/>
					</div>
				</div>
			</div>
		);
	}
}

export {Dashboard};
