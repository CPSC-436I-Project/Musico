import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import "./Button.css";

abstract class Button<P extends IButtonProps = IButtonProps, S extends IButtonState = IButtonState> extends EnhancedComponent<P, S> {

	public static defaultProps: IButtonProps = {
		...EnhancedComponent.defaultProps,
		onAction: (callback: () => void): void => {
			callback();
		},
		disabled: false,
		buttonColour: "#a8a8a8",
		buttonHoverColour: "#383838",
		buttonFocusedColour: "#6f6f6f",
		width: 160,
	};

	protected renderPointer: () => ReactNode;

	protected constructor(props: P) {
		super(props);
		// @ts-ignore
		this.state = {
			...this.state,
			pressed: false,
			disabled: false,
			colour: this.props.buttonColour,
			hovering: false,
			onAction: this.props.onAction,
		};

		this.wrapRenderButton = this.wrapRenderButton.bind(this);
		this.onActionWrapper = this.onActionWrapper.bind(this);
		this.onPressedOut = this.onPressedOut.bind(this);
		this.onPressedIn = this.onPressedIn.bind(this);
		this.onHoverIn = this.onHoverIn.bind(this);
		this.onHoverOut = this.onHoverOut.bind(this);

		this.renderPointer = this.render;
		this.wrapRenderButton();
	}

	private onActionWrapper(): void {
		if (!this.state.disabled && !this.props.disabled) {
			this.setState({disabled: true}, () => {
				this.state.onAction(() => {
					this.setState({
						disabled: false,
						pressed: this.state.pressed
					});
				});
			});
		}
	}

	private onPressedIn(): void {
		this.setState({
			pressed: true,
			colour: this.props.buttonFocusedColour,
		});
	}

	private onPressedOut(): void {
		this.setState({
			pressed: false,
			colour: this.state.hovering ? this.props.buttonHoverColour : this.props.buttonColour,
		});
	}

	private onHoverIn(): void {
		this.setState({
			colour: this.props.buttonHoverColour,
			hovering: true,
		})
	}

	private onHoverOut(): void {
		this.setState({
			colour: this.props.buttonColour,
			hovering: false,
		})
	}

	private wrapRenderButton(): void {
		this.render = (): ReactNode => {
			return(
				<div
					className={"main-button center-mid"}
					onClick={this.onActionWrapper}
					// onMouseDown={this.onPressedIn}
					// onMouseUp={this.onPressedOut}
					onMouseEnter={this.onHoverIn}
					onMouseLeave={this.onHoverOut}
					style={{
						backgroundColor: this.state.colour,
						width: this.props.width,
						maxHeight: this.props.height,
						minHeight: this.props.height,
					}}
				>
					{this.renderPointer()}
				</div>
			);
		};
	}
}

export interface IButtonProps extends IEnhancedComponentProps {
	onAction?: (callback: () => void) => void;
	disabled?: boolean;
	buttonColour?: string;
	buttonHoverColour?: string;
	buttonFocusedColour?: string;
	width?: number | string;
	height?: number;
}

export interface IButtonState extends IEnhancedComponentState {
	pressed: boolean;
	disabled: boolean;
	colour: string;
	hovering: boolean;
	onAction: (callback: () => void) => void;
}

export {Button};
