import * as React from "react";
import {ReactNode, useRef} from "react";
import "../components/css/Room.css";
import {Container, IContainerProps} from "./Container";
import Chat from "src/components/Chat";
import {AddSongForm, MusicSidebar} from "src/components";
import {IStore} from "../redux/initialStore";
import {IMainContainerProps, IMainContainerState} from "./TestScreens/PopupTest";
import {connect} from "react-redux";
import {GenreEnum} from "../components";

class Room extends Container {
	
	public static mapStateToProps:(state: IStore, props: IMainContainerProps) => IMainContainerProps = (state: IStore, props: IMainContainerProps) => {
		return {
			...props,
			...Container.mapStateToProps(state, props),
			selectedGenre: state.roomStore.selectedGenre,
		};
	}
	private sideBarRef: any;

	protected constructor(props: IContainerProps) {
		super(props);

		this.popupRender = this.popupRender.bind(this);
	}

	protected popupRender() {
		return (
			<AddSongForm
				addSong={this.sideBarRef ? this.sideBarRef.addToQueue : () => {/**/}}
			/>
		);
	};

	public render(): ReactNode {
		return (
			<div className="room">
				<div className="chat">
					<Chat/>
				</div>
				<div className="music-sidebar">
					<MusicSidebar
						showPopup={this.openPopup}
						childRef={(ref: any) => {this.sideBarRef = ref; }}
					/>
				</div>
			</div>
		);
	}
}

export interface IRoomProps extends IMainContainerProps {
    selectedGenre?: GenreEnum | null;
}

export interface IRoomState extends IMainContainerState {
}

// @ts-ignore
export default connect(Container.mapStateToProps)(Room);
