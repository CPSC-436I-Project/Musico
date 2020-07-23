import * as React from "react";
import {EnhancedComponent} from ".";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {VoteButtonsContainer} from "./VoteButtonsContainer";
import {SongInfoContainer} from "./SongInfoContainer";
import {Image} from "./Image";
import "./css/MusicSidebar.css";

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
                    <Image width={30} height={30} path={playlistIcon}/>
                    <h2>Queue</h2>
                </div>
                <div className={"queue-items"}>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer width={200} height={112} />
                    </div>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer width={200} height={112} />
                    </div>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer width={200} height={112} />
                    </div>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer width={200} height={112} />
                    </div>
                    <div className={"song"}>
                        <VoteButtonsContainer/>
                        <SongInfoContainer width={200} height={112} />
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
