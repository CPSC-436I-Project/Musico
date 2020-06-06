import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

	public static defaultProps: ITextInputProps = {
		...EnhancedComponent.defaultProps,
		defaultText: "",
		width: "100%",
		color: "transparent",
		colorMargin: 0,
		border: false,
		borderColor: "black",
		fontSize: 16,
	};

	protected constructor(props: ITextInputProps) {
		super(props);
		this.state = {
			...this.state,
		};
		this.updateText = this.updateText.bind(this);
	}

	private updateText(event: any): void {
		this.setState({
			...this.state,
			text: event.target.value,
		});
	}

	public render(): ReactNode {
		return (
			<div
				className="text_input_div"
				style={{
					width: this.props.width,
					backgroundColor: this.props.color,
				}}
			>
				<input
					className="text_input"
					type="text" name="text_input"
					placeholder={this.props.defaultText}
					value={this.state.text}
					onChange={this.updateText}
					style={{
						margin: this.props.colorMargin,
						fontSize: this.props.fontSize,
						outline: "none", border: Number(this.props.border)
					}}
				/>
			</div>
		);
	}
}

export interface ITextInputProps extends IEnhancedComponentProps {
	defaultText: string;
	width?: number | string;
	color?: string;
	colorMargin?: number;
	border?: boolean;
	borderColor?: string;
	fontSize?: number;
}

export interface ITextInputState extends IEnhancedComponentState {
	text: string;
}

export {TextInput};
