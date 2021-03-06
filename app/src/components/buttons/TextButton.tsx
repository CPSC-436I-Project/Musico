import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class TextButton extends Button<ITextButtonProps, ITextButtonState> {

    public static defaultProps: ITextButtonProps = {
        ...Button.defaultProps,
        text: "",
        bold: false,
        fontSize: 16,
        fontColour: "#eee"
    };

    protected constructor(props: ITextButtonProps) {
        super(props);
        this.state = {
            ...this.state,
            text: this.props.text,
        };
    }

    public render(): ReactNode {
        return (
            <div
                className={"center-mid unselectable"}
                style={{
                    ...this.props.additionalStyling,
                    color: this.props.fontColour,
                    fontWeight: this.props.bold ? "bold" : "normal",
                    height: this.props.height,
                    fontSize: this.props.fontSize,
                }}
            >
                <p style={{
                    marginTop: this.props.fontSize / 2,
                    marginBottom: this.props.fontSize / 2
                }}>{this.state.text}</p>
            </div>
        );
    }
}

export interface ITextButtonProps extends IButtonProps {
    text: string;
    bold?: boolean;
    fontSize?: number;
    fontColour?: string;
    additionalStyling?: CSSProperties;
}

export interface ITextButtonState extends IButtonState {
    text: string;
}

export {TextButton};
