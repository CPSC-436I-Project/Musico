import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

// TODO not done
class TextButton extends Button<ITextButtonProps, ITextButtonState> {

	public static defaultProps: ITextButtonProps = {
		width: 15,
		text: "",
	}

	protected constructor(props: ITextButtonProps) {
		super(props);
		// this.state = {
		// 	clicked: false,
		// 	text: props.text,
		// };
	}

	public render(): ReactNode {
		return (
			<div>
				<p>HELLO</p>
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
