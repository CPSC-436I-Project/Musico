import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import "./Components.css";

class TextInput extends EnhancedComponent<ITextInputProps, ITextInputState> {

    public static defaultProps: ITextInputProps = {
        ...EnhancedComponent.defaultProps,
        onsubmit: (callback: () => void): void => {
            callback();
        },
        defaultText: "",
        text: "",
        width: 1000,
        color: "transparent",
        colorMargin: 0,
        border: true,
        borderColor: "black",
        fontSize: 16,
    };

    protected constructor(props: ITextInputProps) {
        super(props);
        this.state = {
            ...this.state,
            defaultText: props.defaultText,
            text: props.text,
            width: props.width,
            color: props.color,
            colorMargin: props.colorMargin,
            border: props.border,
            borderColor: props.borderColor,
            fontSize: props.fontSize,
        };
        this.updateText = this.updateText.bind(this);
    }

    private updateText(event: any): void {
        this.setState({
            text: event.target.value,
        })
    }

    public render(): ReactNode {
        return (
            <div className="text_input_div" style={{width: this.state.width, backgroundColor: this.state.color,
                        border: this.state.border ? "1px solid " + this.state.borderColor : "0px solid black"}}>
                <input className="text_input" type="text" name="text_input" placeholder={this.state.defaultText}
                       value={this.state.text} onChange={this.updateText}
                       style={{margin: this.state.colorMargin, fontSize: this.state.fontSize}}/>
            </div>
        );
    }
}

export interface ITextInputProps {
    onsubmit: (callback: () => void) => void;
    defaultText: string;
    text: string;
    width?: number;
    color?: string;
    colorMargin?: number;
    border: boolean;
    borderColor?: string;
    fontSize?: number;
}

export interface ITextInputState {
    onsubmit: (callback: () => void) => void;
    defaultText: string;
    text: string;
    width?: number;
    color?: string;
    colorMargin?: number;
    border: boolean;
    borderColor?: string;
    fontSize?: number;
}

export {TextInput};