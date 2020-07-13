import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {PopupContainer} from "./PopupContainer";
import {hidePopUp, showPopUp} from "../redux/actions";
import {IStore} from "../redux/initialStore";
import { hideSidebar, showSidebar } from "src/redux/actions/sidebarActions";

abstract class Container <P extends (IContainerProps & {}) = IContainerProps, S extends IContainerState = IContainerState> extends React.PureComponent<P, S> {

	public static defaultProps: IContainerProps = {

	};

	private readonly childRender: () => ReactNode;

	public popupRender: () => ReactNode;

	public static mapStateToProps:(state: IStore, props: IContainerProps) => IContainerProps = (state: IStore, props: IContainerProps) => {
		return {
			...props,
			popupOpen: state.popupStore.popupOpen,
			sidebarOpen: state.sidebarStore.sidebarOpen,
		};
	}

	protected constructor(props: P) {
		super(props);

		this.wrapRender = this.wrapRender.bind(this);

		// @ts-ignore
		this.state = {
			popupOpen: false,
			profileOpen: false,
			sidebarOpen: true
		};

		this.childRender = this.render;
		this.wrapRender();
	}

	openPopup = () => {
		this.props.dispatch(showPopUp());
	};

	closePopup = () => {
		this.props.dispatch(hidePopUp());
	};

	toggleProfile = (callback: () => void) => {
		this.setState({profileOpen: !this.state.profileOpen}, callback)
	};

	toggleSidebar = (callback: () => void) => {
		this.setState({sidebarOpen: !this.state.sidebarOpen}, callback)
	}

	onMenuClick = () => {
        if (this.props.sidebarOpen) {
            this.props.dispatch(hideSidebar());
        } else {
            this.props.dispatch(showSidebar());
        }
    }

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
	dispatch?: any;
}

export interface IContainerState {
	popupOpen?: boolean;
	profileOpen?: boolean;
	sidebarOpen?: boolean;
}

export {Container};
