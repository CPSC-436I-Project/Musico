import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";

// TODO not done
class PopupContainer extends Container<IPopupContainerProps, IPopupContainerState> {

	public static defaultProps: IPopupContainerProps = {

	};

	protected constructor(props: IPopupContainerProps) {
		super(props);
		this.state = {
		};
	}

	// TODO Replace close button with ImageButton
	public render(): ReactNode {
		return (
			<div className="overlay">
				<div className="popup">
					<button id="close_button" onClick={this.props.closeFn}>x</button>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export interface IPopupContainerProps extends IContainerProps {
	children?: ReactNode;
	closeFn?: any;
}

export interface IPopupContainerState extends IContainerState {

}

export {PopupContainer};
