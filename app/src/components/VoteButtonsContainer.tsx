import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import { UpvoteButton } from "./buttons/UpvoteButton";
import { DownvoteButton } from "./buttons/DownvoteButton";
import "./buttons/VoteButtons.css"

class VoteButtonsContainer extends EnhancedComponent<IVoteButtonsContainerProps, IVoteButtonsContainerState> {

    protected constructor(props: IVoteButtonsContainerProps) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    public render(): ReactNode {
        return (
            <div>
                <UpvoteButton />
                <div className={"rating"}>
                    {this.state.rating}
                </div>
                <DownvoteButton />
            </div>
        )
    }
}

export interface IVoteButtonsContainerProps extends IEnhancedComponentProps {

}

export interface IVoteButtonsContainerState extends IEnhancedComponentState {
    rating: number;
}

export {VoteButtonsContainer}