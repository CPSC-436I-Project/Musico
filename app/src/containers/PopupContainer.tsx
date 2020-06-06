import * as React from "react";
import {ReactNode} from "react";
import {ImageButton} from "../components/buttons/ImageButton";
import closeIcon from "../icons/close.png";


class PopupContainer<P extends IPopupContainerProps, S extends IPopupContainerState = IPopupContainerState> extends React.Component<P, S> {

	public static defaultProps: IPopupContainerProps = {
		/* any default props to all popups here */
	};

	protected constructor(props: P) {
		super(props);
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

export interface IPopupContainerProps {
	children?: ReactNode;
	closeFn?: (callback: () => void) => void;
}

export interface IPopupContainerState {

}

export {PopupContainer};
