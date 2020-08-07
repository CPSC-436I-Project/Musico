import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {TextButton} from "../../components/buttons/TextButton";

class TextButtonTest extends Container<ITextButtonTestProps, ITextButtonTestState> {

    public static defaultProps: ITextButtonTestProps = {
        ...Container.defaultProps,
    };

    protected constructor(props: ITextButtonTestProps) {
        super(props);
    }

    private static textButtonCallback(callback: () => void): void {
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
                    buttonColour={"#b32e2e"}
                    buttonHoverColour={"#dc6c6c"}
                    buttonFocusedColour={"#821c1c"}
                />
                <TextButton
                    text={"Small"}
                    width={80}
                    height={10}
                    fontSize={10}
                    fontColour={"#222"}
                />
                <TextButton
                    text={"Really really really long text"}
                    width={250}
                    fontSize={14}
                    fontColour={"#222"}
                />
                <TextButton
                    text={"Login"}
                    width={250}
                    height={50}
                    fontSize={24}
                    bold={true}
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
