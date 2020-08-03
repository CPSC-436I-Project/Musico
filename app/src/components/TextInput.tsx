import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";

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
		onEnterDisabled: true,
		textType: "text",
		submit: (text: string) => {
		},
	};

	protected constructor(props: ITextInputProps) {
		super(props);
		this.state = {
			text: "",
			onEnterDisabled: false,
			onKeyDown: this.props.onEnterKeyDown,
		};
		this.updateText = this.updateText.bind(this);
		this.getText = this.getText.bind(this);
		this.onKeyDownWrapper = this.onKeyDownWrapper.bind(this);
	}

	protected onKeyDownWrapper(e: any): void {
		if (e.key === 'Enter' && !this.state.onEnterDisabled && !this.props.onEnterDisabled) {
			this.setState({onEnterDisabled: true}, () => {
				this.state.onKeyDown(() => {
					this.setState({
						onEnterDisabled: false,
						text: ""
					});
				});
			});
		}
	}

	protected updateText(event: any): void {
		event.preventDefault();
		this.setState({
			text: event.target.value,
		}, () => {
			this.props.submit(this.state.text)
		});
	}

	public getText(): string {
		return this.state.text;
	}

	public render(): ReactNode {
		return (
			<div
				className="text_input_div"
				style={{
					backgroundColor: this.props.color,
					border: Number(this.props.border),
					width: this.props.width,
				}}
			>
				<input
					className={"text_input unselectable"}
					type={this.props.textType}
					name={"text_input"}
					placeholder={this.props.defaultText}
					value={this.state.text}
					onChange={this.updateText}
					onKeyDown={this.onKeyDownWrapper}
					style={{
						margin: this.props.colorMargin,
						width: `calc(100% - ${2 * this.props.colorMargin + 5}px)`,
						fontSize: this.props.fontSize,
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
	onEnterDisabled: boolean;
	submit: (text: string) => void;
	onEnterKeyDown?: (callback: () => void) => void;
	textType?: string;
}

export interface ITextInputState extends IEnhancedComponentState {
	text: string;
	onEnterDisabled: boolean;
	onKeyDown: (callback: () => void) => void;
}

export {TextInput};
