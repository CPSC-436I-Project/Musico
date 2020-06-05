import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class TextButton extends Button<ITextButtonProps, ITextButtonState> {

	public static defaultProps: ITextButtonProps = {
		...Button.defaultProps,
		text: "",
	}

	protected constructor(props: ITextButtonProps) {
		super(props);
		this.state = {
			...this.state,
			pressed: false,
			text: this.props.text,
		};
	}

	public render(): ReactNode {
		return (
			<div style={{userSelect: "none"}}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}

export interface ITextButtonProps extends IButtonProps {
	text: string;
}

export interface ITextButtonState extends IButtonState {
	text: string;
}

export {TextButton};
