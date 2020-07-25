import * as React from "react";
import {EnhancedComponent} from ".";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {VoteButtonsContainer} from "./VoteButtonsContainer";
import {SongInfoContainer} from "./SongInfoContainer";
import {Image} from "./Image";
import "./css/MusicSidebar.css";
import {ReactNode} from "react";

class MusicPlayerQueue extends EnhancedComponent<IMusicPlayerQueueProps, IMusicPlayerQueueState> {
    public static defaultProps: IMusicPlayerQueueProps = {
        ...EnhancedComponent.defaultProps,
        queue: []
    }

    protected constructor(props: IMusicPlayerQueueProps) {
        super(props);
    }

    private static createSongElement(song: any): ReactNode {
        return(
            <div key={song._id} className={"flex-row"}>
                <VoteButtonsContainer
                    rating={song.numVotes}
                    songId={song._id}
                />
                <SongInfoContainer
                    songName={song.songName}
                    artists={song.artists}
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
                    {this.props.queue.map(MusicPlayerQueue.createSongElement)}
                </div>
            </div>
        )
    }
}

interface Song {
    _id: any,
    songName: string,
    artists: string[],
    genre: string,
    src: string,
    requesterID: any,
    albumCover: string,
    numVotes: number
}

export interface IMusicPlayerQueueProps extends IEnhancedComponentProps {
    queue: any[]
}

export interface IMusicPlayerQueueState extends IEnhancedComponentState {

}

export {MusicPlayerQueue};
