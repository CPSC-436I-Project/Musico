import * as React from "react";
import {EnhancedComponent} from ".";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {VoteButtonsContainer} from "./VoteButtonsContainer";
import {SongInfoContainer} from "./SongInfoContainer";
import "./MusicPlayerQueue.css";
import {Image} from "./Image"

class MusicPlayerQueue extends EnhancedComponent<IMusicPlayerQueueProps, IMusicPlayerQueueState> {
    public static defaultProps: IMusicPlayerQueueProps = {
        ...EnhancedComponent.defaultProps
    }

    protected constructor(props: IMusicPlayerQueueProps) {
        super(props);
    }

    public render() {
        const playlistIcon = "https://img.icons8.com/color/48/000000/smart-playlist.png";
        return (
            <div className="music-player-queue">
                <div className="queue-header">
                    {/*<img className="playlist-icon" src={playlistIcon}/>*/}
                    <Image path={playlistIcon}/>
                    <h4>Queue</h4>
                </div>
                {/* <img className="playlist-icon" src={playlistIcon} />
                <h4>Queue</h4> */}
                <div className={"queue-items"}>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer/>
                    </div>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export interface IMusicPlayerQueueProps extends IEnhancedComponentProps {

}

export interface IMusicPlayerQueueState extends IEnhancedComponentState {

}

export {MusicPlayerQueue};