import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {UpvoteButton} from "./buttons/UpvoteButton";
import {DownvoteButton} from "./buttons/DownvoteButton";
import "./css/VoteButtons.css"
import {API_URL} from "src/utility/constants";
import {getCookie} from "../utility/cookies";

class VoteButtonsContainer extends EnhancedComponent<IVoteButtonsContainerProps, IVoteButtonsContainerState> {

    public static defaultProps: IVoteButtonsContainerProps = {
        ...EnhancedComponent.defaultProps,
        rating: 1,
        songId: 0,
    };

    protected constructor(props: IVoteButtonsContainerProps) {
        super(props);
    }

    /**
     * Sends a request to upvote this song in the DB
     *
     * @param callback
     */
    voteUp = (callback: () => void) => {
        const token = getCookie('auth-token');
        fetch(API_URL + "songs/upvote/" + this.props.songId, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "auth-token": token
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    let resp = await response.json()
                    resp.type = "up";
                    this.props.voteCompletionHandler(resp);
                }
            })
            .then(callback)
    };

    /**
     * Sends a request to downvote this song in the DB
     * @param callback
     */
    voteDown = (callback: () => void) => {
        const token = getCookie('auth-token');
        fetch(API_URL + "songs/downvote/" + this.props.songId, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "auth-token": token
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    let resp = await response.json()
                    resp.type = "down";
                    this.props.voteCompletionHandler(resp);
                }
            })
            .then(callback)
    };

    public render(): ReactNode {
        return (
            <div className={"vote-buttons-container"}>
                <UpvoteButton onAction={this.voteUp}/>
                <div className={"rating"}>
                    {this.props.rating}
                </div>
                <DownvoteButton onAction={this.voteDown}/>
            </div>
        )
    }
}

export interface IVoteButtonsContainerProps extends IEnhancedComponentProps {
    rating: number,
    songId: string | number,
    voteCompletionHandler?: (resp: any) => void,
}

export interface IVoteButtonsContainerState extends IEnhancedComponentState {
}

export {VoteButtonsContainer}
