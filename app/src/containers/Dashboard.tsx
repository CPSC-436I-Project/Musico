import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {Sidebar} from "../components";
import {connect} from "react-redux";
import { InnerDashboard } from "src/components/InnerDashboard";
import Room from "./Room";
import { IStore } from "src/redux/initialStore";
import InnerProfile from "../components/InnerProfile";

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

	public render(): ReactNode {
		return (
			<div className={"dashboard dashboard_lower dashboard-display"}>
				<InnerDashboard/>
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
