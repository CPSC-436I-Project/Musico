import * as React from "react";
import {EnhancedComponent} from ".";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {VoteButtonsContainer} from "./VoteButtonsContainer";
import {SongInfoContainer} from "./SongInfoContainer";
import {Image} from "./Image";
import "./css/MusicSidebar.css";
import {ReactNode} from "react";
import {ISongInterface} from "../utility/songs";

class MusicPlayerQueue extends EnhancedComponent<IMusicPlayerQueueProps, IMusicPlayerQueueState> {

    public static defaultProps: IMusicPlayerQueueProps = {
        ...EnhancedComponent.defaultProps,
        queue: [],
        voteCompletionHandler: () => {
        }
    };

    protected constructor(props: IMusicPlayerQueueProps) {
        super(props);
    }

    /**
     * Render the song in a queue as a ReactNode
     *
     * @param song {ISongInterface} - The song to render
     * @param voteCompletionHandler {(resp: any) => void} - handler for when a vote happens
     * @return {ReactNode} The rendered Song element
     * @private
     */
    private static createSongElement(song: ISongInterface, voteCompletionHandler: (resp: any) => void): ReactNode {
        return (
            <div key={song._id} className={"flex-row"}>
                <VoteButtonsContainer
                    rating={song.numVotes}
                    songId={song._id}
                    voteCompletionHandler={voteCompletionHandler}
                />
                <SongInfoContainer
                    songName={song.songName}
                    albumCover={song.albumCover}
                    width={132}
                    height={74}
                />
            </div>
        )
    }

    public render() {
        return (
            <div className="music-player-queue">
                <div className="queue-header">
                    <Image
                        width={30}
                        height={30}
                        path={"https://img.icons8.com/color/48/000000/smart-playlist.png"}
                    />
                    <h2>Queue</h2>
                </div>
                <div className={"queue-items center-mid"}>
                    {this.props.queue.sort((a, b) => b.numVotes - a.numVotes).map(x => MusicPlayerQueue.createSongElement(x, this.props.voteCompletionHandler))}
                </div>
            </div>
        )
    }
}

export interface IMusicPlayerQueueProps extends IEnhancedComponentProps {
    queue: ISongInterface[];
    voteCompletionHandler?: (resp: any) => void;
}

export interface IMusicPlayerQueueState extends IEnhancedComponentState {
}

export {MusicPlayerQueue};
