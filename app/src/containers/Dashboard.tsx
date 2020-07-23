import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {Header, Sidebar, MusicSidebar} from "../components";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {DebugScreen} from "./TestScreens/DebugScreen";
import {GenericScreen} from "./TestScreens/GenericScreen";
import {Profile} from "./Profile";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";

class Dashboard extends Container {
	public static defaultProps: IDashboardProps = {
		...Container.defaultProps,
	}
	
	public static mapStateToProps:(state: IStore, props: IDashboardProps) => IDashboardProps = (state: IStore, props: IDashboardProps) => {
		return {
			...props,
			sidebarOpen: state.sidebarStore.sidebarOpen,
			musicSidebarOpen: state.musicSidebarStore.musicSidebarOpen,
		};
	}

    protected constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            musicSidebarOpen: true
        };
	}
	
	public render(): ReactNode {
		return (
			<div id={"dashboard"}>
				<div id={"dashboard_upper"}>
					<Header profileImgSrc={profilePlaceholder} onProfileClick={this.toggleProfile} />
				</div>
				<div id={"dashboard_lower"}>
					<div id={"dashboard_sidebar"}>
						{this.props.sidebarOpen && <Sidebar />}
					</div>
					<div id={"dashboard-display"}>
						{/*{this.state.profileOpen ? <Profile/> : <GenericScreen/>}*/}
						{this.state.profileOpen ? <Profile/> : <DebugScreen/>}
					</div>
					<div id={"music_sidebar"}>
						{this.props.musicSidebarOpen && <MusicSidebar />}
					</div>
				</div>
			</div>
		);
	}
}

export interface IDashboardProps extends IContainerProps {
	musicSidebarOpen?: boolean,
	dispatch?: any;
}

export interface IDashboardState extends IContainerState {
	musicSidebarOpen?: boolean;
}

//@ts-ignore
export default connect(Dashboard.mapStateToProps)(Dashboard)
