import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {UpvoteButton} from "./buttons/UpvoteButton";
import {DownvoteButton} from "./buttons/DownvoteButton";
import "./buttons/VoteButtons.css"
import { API_URL } from "src/utility/constants";

class VoteButtonsContainer extends EnhancedComponent<IVoteButtonsContainerProps, IVoteButtonsContainerState> {
    public static defaultProps: IVoteButtonsContainerProps = {
        ...EnhancedComponent.defaultProps,
        rating: 1,
        songId: 0,
    }

    protected constructor(props: IVoteButtonsContainerProps) {
        super(props);
        this.state = {
            rating: this.props.rating,
        }
    }

    voteUp = (callback: () => void) => {
        this.setState({rating: this.state.rating + 1})
        fetch(API_URL + "songs/upvote/" + this.props.songId, {
            method: "PATCH",
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(callback)
    };

    voteDown = (callback: () => void) => {
        this.setState({rating: this.state.rating - 1})
        fetch(API_URL + "songs/downvote/" + this.props.songId, {
            method: "PATCH",
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(callback)
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
    rating: number,
    songId: any,
}

export interface IVoteButtonsContainerState extends IEnhancedComponentState {
    rating: number;
}

export {VoteButtonsContainer}
