import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {PopupContainer} from "./PopupContainer";
import {AddSongForm} from "../components/AddSongForm";

abstract class Container<P extends IContainerProps = IContainerProps, S extends IContainerState = IContainerState> extends React.PureComponent<P, S> {

	public static defaultProps: IContainerProps = {
		/* default props to all containers here */
	};

	private readonly childRender: () => ReactNode;

	public popupRender: () => ReactNode;

	protected constructor(props: P) {
		super(props);

		this.wrapRender = this.wrapRender.bind(this);

		// @ts-ignore
		this.state = {
			popupOpen: false,
		};

		this.childRender = this.render;
		this.wrapRender();
	}

	openPopup = () => {
		this.setState({popupOpen: true});
	};

	closePopup = () => {
		this.setState({popupOpen: false});
	};

	private wrapRender(): void {
		this.render = (): ReactNode => {
			return (
				<div>
					{this.childRender()}
					{this.state.popupOpen &&
					<PopupContainer closeFn={this.closePopup}>
						{this.popupRender()}
					</PopupContainer>}
				</div>
			);
		};
	}
}

export interface IContainerProps {

}

export interface IContainerState {
	popupOpen?: boolean;
}

export {Container};
