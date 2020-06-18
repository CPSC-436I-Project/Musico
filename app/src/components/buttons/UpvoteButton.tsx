import React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./VoteButtons.css"

class UpvoteButton extends Button<IUpvoteButtonProps, IUpvoteButtonState> {
    
    public static defaultProps: IUpvoteButtonProps = {
        ...Button.defaultProps,
        buttonColour: "transparent",
        buttonHoverColour: "transparent",
        buttonFocusedColour: "transparent"
    }

    public constructor(props: IUpvoteButtonProps) {
        super(props);
        this.state = {
            ...this.state
        }
    }

    public render(): ReactNode {
        return (
            <div className={"upvote-button"}></div>
        )
    }
}

export interface IUpvoteButtonProps extends IButtonProps {
}

export interface IUpvoteButtonState extends IButtonState {

}

export {UpvoteButton};