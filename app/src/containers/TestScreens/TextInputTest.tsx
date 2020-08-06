import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {TextInput} from "../../components/TextInput";

class TextInputTest extends Container<ITextInputTestProps, ITextInputTestState> {

    public static defaultProps: ITextInputTestProps = {};

    protected constructor(props: ITextInputTestProps) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Text Inputs</h2>
                <form onSubmit={(event) => event.preventDefault()}>
                    <TextInput
                        defaultText={"This is a text input"}
                        width={300}
                        color={"yellow"}
                        colorMargin={3}
                    />
                    <TextInput
                        defaultText={"This is another text input"}
                        color={"red"}
                        colorMargin={10}
                        border={false}
                        fontSize={20}
                    />
                    <TextInput
                        defaultText={"This is also a text input"}
                        width={550}
                        borderColor={"blue"}
                        fontSize={30}
                    />
                </form>
            </div>
        );
    }
}

export interface ITextInputTestProps extends IContainerProps {
}

export interface ITextInputTestState extends IContainerState {
}

export {TextInputTest};
