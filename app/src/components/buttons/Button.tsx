import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import "./Button.css";

abstract class Button<P extends IButtonProps = IButtonProps, S extends IButtonState = IButtonState> extends EnhancedComponent<P, S> {

	public static defaultProps: IButtonProps = {
		/* add default props that belong to every component */
		width: 10,
	}

	protected constructor(props: P) {
		super(props);
		// @ts-ignore
		this.state = {
			clicked: false,
		};
	}

	public render(): ReactNode {
		return (
			<div>
				TEMP
			</div>
		);
	}
}

export interface IButtonProps extends IEnhancedComponentProps {
	width: number;
	height?: number;
}

export interface IButtonState extends IEnhancedComponentState {
	clicked: boolean;
}

export {Button};
