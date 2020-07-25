import * as React from "react";
import {ReactNode} from "react";
import "../components/css/Room.css";
import {Container} from "./Container";
import Chat from "src/components/Chat";
import {AddSongForm, MusicSidebar} from "src/components";
import {IStore} from "../redux/initialStore";
import {IMainContainerProps} from "./TestScreens/PopupTest";
import {connect} from "react-redux";

class Room extends Container {
	public static mapStateToProps:(state: IStore, props: IMainContainerProps) => IMainContainerProps = (state: IStore, props: IMainContainerProps) => {
		return {
			...props,
			...Container.mapStateToProps(state, props),
		};
	}

	protected popupRender() {
		return (
			<AddSongForm/>
		);
	};

	public render(): ReactNode {
		return (
			<div className="room">
				<div className="chat">
					<Chat/>
				</div>
				<div className="music-sidebar">
					<MusicSidebar showPopup={this.openPopup}/>
				</div>
			</div>
		);
	}
}

// @ts-ignore
export default connect(Container.mapStateToProps)(Room);
