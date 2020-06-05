import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {TextButton} from "../../components/buttons/TextButton";

class TextButtonTest extends Container<ITextButtonTestProps, ITextButtonTestState> {

	public static defaultProps: ITextButtonTestProps = {};

	protected constructor(props: ITextButtonTestProps) {
		super(props);
		this.state = {};

	}

	private static textButtonCallback(callback: () => void): void {
		console.log("Text Button clicked");
		callback();
	}

	public render(): ReactNode {
		return (
			<div className={"flex-column-center"}>
				<h2>Text Button</h2>
				<TextButton
					text={"Default Props"}
					onAction={TextButtonTest.textButtonCallback}
				/>
				<TextButton
					text={"Custom Colours"}
					onAction={TextButtonTest.textButtonCallback}
					buttonColour={"#b32e2e"}
					buttonHoverColour={"#dc6c6c"}
					buttonFocusedColour={"#821c1c"}
				/>
			</div>
		);
	}
}

export interface ITextButtonTestProps extends IContainerProps {

}

export interface ITextButtonTestState extends IContainerState {

}

export {TextButtonTest};
