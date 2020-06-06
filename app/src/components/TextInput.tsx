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
    };

    protected constructor(props: ITextInputProps) {
        super(props);
        this.state = {
            ...this.state,
            defaultText: props.defaultText,
            text: props.text,
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
            <div>
                <form onSubmit={
                    event => {event.preventDefault();}
                }>
                    <input type="text" name="text_input" placeholder={this.state.defaultText}
                            value={this.state.text} onChange={this.updateText} />
                </form>
            </div>
        );
    }
}

export interface ITextInputProps {
    onsubmit: (callback: () => void) => void;
    defaultText: string;
    text: string;
}

export interface ITextInputState {
    onsubmit: (callback: () => void) => void;
    defaultText: string;
    text: string;
}

export {TextInput};