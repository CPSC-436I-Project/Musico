import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {UpvoteButton} from "./buttons/UpvoteButton";
import {DownvoteButton} from "./buttons/DownvoteButton";
import "./buttons/VoteButtons.css"

class VoteButtonsContainer extends EnhancedComponent<IVoteButtonsContainerProps, IVoteButtonsContainerState> {
    public static defaultProps: IVoteButtonsContainerProps = {
        ...EnhancedComponent.defaultProps,
        rating: 1
    }

    protected constructor(props: IVoteButtonsContainerProps) {
        super(props);
        this.state = {
            rating: 1
        }
    }

    voteUp = (callback: () => void) => {
        this.setState({rating: this.state.rating + 1}, callback);
    };

    voteDown = (callback: () => void) => {
        this.setState({rating: this.state.rating - 1}, callback)
    };

    public render(): ReactNode {
        return (
            <div className={"vote-buttons-container"}>
                <UpvoteButton onAction={this.voteUp}/>
                <div className={"rating"}>
                    {this.state.rating}
                </div>
                <DownvoteButton onAction={this.voteDown}/>
            </div>
        )
    }
}

export interface IVoteButtonsContainerProps extends IEnhancedComponentProps {
    rating: number
}

export interface IVoteButtonsContainerState extends IEnhancedComponentState {
    rating: number;
}

export {VoteButtonsContainer}
