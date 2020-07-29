import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {PopupContainer} from "./PopupContainer";
import {hidePopUp, showPopUp} from "../redux/actions";
import {IStore} from "../redux/initialStore";
import {PageEnum} from "./index";

abstract class Container <P extends (IContainerProps & {}) = IContainerProps, S extends IContainerState = IContainerState> extends React.PureComponent<P, S> {

	public static defaultProps: IContainerProps = {

	};

	private readonly childRender: () => ReactNode;

	public static mapStateToProps:(state: IStore, props: IContainerProps) => IContainerProps = (state: IStore, props: IContainerProps) => {
		return {
			...props,
			popupOpen: state.popupStore.popupOpen,
			selectedGenre: state.chatRoomStore.selectedGenre
		};
	}

	protected constructor(props: P) {
		super(props);

		this.wrapRender = this.wrapRender.bind(this);

		// @ts-ignore
		this.state = {
			popupOpen: false,
			profileOpen: false,
			sidebarOpen: true,
			musicSidebarOpen: true,
		};

		this.childRender = this.render;
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.popupRender = this.popupRender.bind(this);
		this.wrapRender();
	}

	protected openPopup() {
		this.props.dispatch(showPopUp());
	};

	protected closePopup() {
		this.props.dispatch(hidePopUp());
	};

	protected popupRender(): ReactNode {
		return <div/>;
	};

	toggleProfile = (callback: () => void) => {
		//this.setState({profileOpen: !this.state.profileOpen}, callback)
		this.props.changePage(PageEnum.Profile)
	};

	private wrapRender(): void {
		this.render = (): ReactNode => {
			return (
				<div className={"fill-container"}>
					{this.childRender()}
					{this.props.popupOpen &&
					<PopupContainer closeFn={this.closePopup}>
						{this.popupRender()}
					</PopupContainer>}
				</div>
			);
		};
	}
}

export interface IContainerProps {
	popupOpen?: boolean;
	sidebarOpen?: boolean;
	musicSidebarOpen?: boolean;
	dispatch?: any;
	changePage?: (page: PageEnum) => void;
	selectedGenre?: string;
}

export interface IContainerState {
	popupOpen?: boolean;
	profileOpen?: boolean;
	selectedGenre?: string;
	sidebarOpen?: boolean;
	musicSidebarOpen?: boolean;
}

export {Container}
