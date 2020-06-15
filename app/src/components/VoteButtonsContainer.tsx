import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import { UpvoteButton } from "./buttons/UpvoteButton";
import { DownvoteButton } from "./buttons/DownvoteButton";
import "./buttons/VoteButtons.css"

class VoteButtonsContainer extends EnhancedComponent<IVoteButtonsProps, IVoteButtonsState> {

    public render(): ReactNode {
        return (
            <div 
                style={{
                    display: "inline-block",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <UpvoteButton />
                <div className={"rating"}>
                    0
                </div>
                <DownvoteButton />
            </div>
        )
    }
}

export interface IVoteButtonsProps extends IEnhancedComponentProps {

}

export interface IVoteButtonsState extends IEnhancedComponentState {

}

export {VoteButtonsContainer}