import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {PopupContainer} from "./PopupContainer";
import {hidePopUp, hideSidebar, showPopUp, showSidebar} from "../redux/actions";
import {IStore} from "../redux/initialStore";
import {PageEnum} from "./index";
import { GenreEnum } from "src/components";
import {Header, Sidebar} from "../components";

abstract class Container <P extends (IContainerProps & {}) = IContainerProps, S extends IContainerState = IContainerState> extends React.PureComponent<P, S> {

	public static defaultProps: IContainerProps = {
		showHeader: true,
		showSidebar: true,
	};

	private readonly childRender: () => ReactNode;

	public static mapStateToProps:(state: IStore, props: IContainerProps) => IContainerProps = (state: IStore, props: IContainerProps) => {
		return {
			...props,
			popupOpen: state.popupStore.popupOpen,
			selectedGenre: state.roomStore.selectedGenre,
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
			sidebarOpen: this.props.sidebarOpen,
			musicSidebarOpen: true,
		};

		this.childRender = this.render;
		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.popupRender = this.popupRender.bind(this);
		this.toggleProfile = this.toggleProfile.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
		this.logoClick = this.logoClick.bind(this);
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

	private toggleProfile(callback: () => void) {
		this.props.changePage(PageEnum.Profile);
		callback();
	}

	private onMenuClick(callback: () => void) {
		this.setState({sidebarOpen: !this.state.sidebarOpen}, () => {
			if (this.state.sidebarOpen) {
				this.props.dispatch(showSidebar());
			} else {
				this.props.dispatch(hideSidebar());
			}
			callback();
		});
	}

	private logoClick(callback: () => void) {
		this.props.changePage(PageEnum.Dashboard);
		callback();
	}

	private wrapRender(): void {
		this.render = (): ReactNode => {
			return (
				<div className={"fill-container"}>
					{this.props.showHeader && <div id={"dashboard_upper"}>
						<Header
							onProfileClick={this.toggleProfile}
							onMenuClick={this.onMenuClick}
							onLogoClick={this.logoClick}
						/>
					</div>}
					<div className={"container-contents"}>
						{(this.props.showSidebar && this.state.sidebarOpen) &&
						<div className={"dashboard_sidebar dashboard_lower"}>
							<Sidebar changePage={this.props.changePage}/>
						</div>}
						<div className={"fill-container"}>
							{this.childRender()}
						</div>
					</div>
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
	selectedGenre?: GenreEnum | null;
	showHeader?: boolean;
	showSidebar?: boolean;
}

export interface IContainerState {
	popupOpen?: boolean;
	profileOpen?: boolean;
	selectedGenre?: string;
	sidebarOpen?: boolean;
	musicSidebarOpen?: boolean;
}

export {Container}
