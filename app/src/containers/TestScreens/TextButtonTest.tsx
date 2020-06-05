import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {TextButton} from "../../components/buttons/TextButton";

class TextButtonTest extends Container<ITextButtonTextProps, ITextButtonTextState> {

	public static defaultProps: ITextButtonTextProps = {};

	protected constructor(props: ITextButtonTextProps) {
		super(props);
		this.state = {};
	}

	public render(): ReactNode {
		return (
			<div className={"flex-column-center"}>
				<h2>Text Button</h2>
				<TextButton text={"Test test test"} onAction={(callback: () => void) => {alert("Text Button clicked"); }}/>
			</div>
		);
	}
}

export interface ITextButtonTextProps extends IContainerProps {

}

export interface ITextButtonTextState extends IContainerState {

}

export {TextButtonTest};
