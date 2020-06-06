import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {TextInput} from "../../components/TextInput";

class TextInputTest extends Container<ITextInputTestProps, ITextInputTestState> {

    public static defaultProps: ITextInputTestProps = {};

    protected constructor(props: ITextInputTestProps) {
        super(props);
        this.state = {};

    }

    private static textInputCallback(callback: () => void): void {
        console.log("Text Input Sent");
        callback();
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Text Inputs</h2>
                    <TextInput
                        defaultText={"This is a text input"}
                        onsubmit={TextInputTest.textInputCallback}
                    />
                    <TextInput
                        defaultText={"This is another text input"}
                        onsubmit={TextInputTest.textInputCallback}
                    />
                    <TextInput
                        defaultText={"This is also a text input"}
                        onsubmit={TextInputTest.textInputCallback}
                    />
            </div>
        );
    }
}

export interface ITextInputTestProps extends IContainerProps {

}

export interface ITextInputTestState extends IContainerState {

}

export {TextInputTest};
