import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import "./Components.css";

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

    public static defaultProps: ITextInputProps = {
        // callback: () => {return void},
        defaultText: "",
        text: "",
    };

    protected constructor(props: ITextInputProps) {
        super(props);
        this.state = {
            // callback: props.callback,
            defaultText: props.defaultText,
            text: props.text,
        };
    }

    public render(): ReactNode {
        return (
            <div> THIS IS A PLACEHOLDER </div>
        );
    }
}

export interface ITextInputProps {
    // callback: () => void;
    defaultText: string;
    text: string;
}

export interface ITextInputState {
    // callback: () => void;
    defaultText: string;
    text: string;
}

export {TextInput};