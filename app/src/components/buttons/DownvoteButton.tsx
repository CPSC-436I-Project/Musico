import React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class DownvoteButton extends Button<IDownvoteButtonProps, IDownvoteButtonState> {

    public static defaultProps: IDownvoteButtonProps = {
        ...Button.defaultProps,
        buttonColour: "transparent",
        buttonHoverColour: "transparent",
        buttonFocusedColour: "transparent",
        width: 20,
    };

    protected constructor(props: IDownvoteButtonProps) {
        super(props);
        this.state = {
            ...this.state
        }
    }

    public render(): ReactNode {
        return (
            <div className={"downvote-button"}/>
        )
    }
}

export interface IDownvoteButtonProps extends IButtonProps {
}

export interface IDownvoteButtonState extends IButtonState {
}

export {DownvoteButton};
