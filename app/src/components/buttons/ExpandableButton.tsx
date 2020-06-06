import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class ExpandableButton extends Button<IExpandableButtonProps, IExpandableButtonState> {

	public static defaultProps: IExpandableButtonProps = {
		...Button.defaultProps,
		text: "",
	}

	protected constructor(props: IExpandableButtonProps) {
		super(props);
		this.state = {
			...this.state,
			text: this.props.text,
		};
	}

	public render(): ReactNode {
		return (
			<div
				className={"center-mid"}
			>
				<p>{this.state.text}</p>
			</div>
		);
	}
}

export interface IExpandableButtonProps extends IButtonProps {
	text?: string;
}

export interface IExpandableButtonState extends IButtonState {
	text: string;
}

export {ExpandableButton};
