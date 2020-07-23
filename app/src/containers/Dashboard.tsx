import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {Header, Sidebar} from "../components";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import { InnerDashboard } from "src/components/InnerDashboard";
import { Room } from "./Room";
import { IStore } from "src/redux/initialStore";

class Dashboard extends Container<IDashboardProps, IDashboardState> {

	public static mapStateToProps:(state: IStore, props: IDashboardProps) => IDashboardProps = (state: IStore, props: IDashboardProps) => {
		return {
			...props,
			selectedGenre: state.chatRoomStore.selectedGenre
		};
	}

	constructor(props: any) {
		super(props);

		this.state = {
			sidebarOpen: true
		}
	}

	onMenuClick = (callback: () => void) => {
		this.setState({sidebarOpen: !this.state.sidebarOpen});
		callback();
	}

	public render(): ReactNode {
		let renderRoom = this.props.selectedGenre ? <Room/> : <InnerDashboard/>
		let renderer = this.state.profileOpen ? <Profile/> : renderRoom;
		let sidebarRenderer = this.state.sidebarOpen &&  <div id={"dashboard_sidebar"}><Sidebar/></div>;
		return (
			<div id={"dashboard"}>
				<div id={"dashboard_upper"}>
					<Header profileImgSrc={profilePlaceholder} onProfileClick={this.toggleProfile} onMenuClick={this.onMenuClick}/>
				</div>
				<div id={"dashboard_lower"}>
					{sidebarRenderer}
					<div id={"dashboard-display"}>
						{renderer}
					</div>
				</div>
			</div>
		);
	}
}

export interface IDashboardProps extends IContainerProps {
	selectedGenre?: string;
}

export interface IDashboardState extends IContainerState {
	sidebarOpen?: boolean;
}

// @ts-ignore
export default connect(Dashboard.mapStateToProps)(Dashboard);
