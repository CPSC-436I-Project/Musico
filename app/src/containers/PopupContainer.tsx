import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {ImageButton} from "../components/buttons/ImageButton";
import closeIcon from "../icons/close.png";


class PopupContainer extends Container<IPopupContainerProps, IPopupContainerState> {

	public static defaultProps: IPopupContainerProps = {

	};

	protected constructor(props: IPopupContainerProps) {
		super(props);
		this.state = {
		};
	}

	public render(): ReactNode {
		return (
			<div className="overlay">
				<div className="popup">
					<span className="closeButtonContainer">
						<ImageButton src={closeIcon} onAction={this.props.closeFn} height={20} width={20} buttonColour="white"/>
					</span>
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
