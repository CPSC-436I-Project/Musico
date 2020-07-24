import * as React from "react";
import {EnhancedComponent} from ".";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {VoteButtonsContainer} from "./VoteButtonsContainer";
import {SongInfoContainer} from "./SongInfoContainer";
import {Image} from "./Image";
import "./css/MusicSidebar.css";

class MusicPlayerQueue extends EnhancedComponent<IMusicPlayerQueueProps, IMusicPlayerQueueState> {
    public static defaultProps: IMusicPlayerQueueProps = {
        ...EnhancedComponent.defaultProps,
        queue: []
    }

    protected constructor(props: IMusicPlayerQueueProps) {
        super(props);
    }

    public render() {
        const playlistIcon = "https://img.icons8.com/color/48/000000/smart-playlist.png";

        let ratings: any[] = [];
        let songsOnQueue: any[] = [];
        this.props.queue.forEach((song: Song) => {
            ratings.push(<VoteButtonsContainer 
                rating={song.numVotes}/>)
            songsOnQueue.push(<SongInfoContainer 
                songName={song.songName} 
                artists={song.artists}
                albumCover={song.albumCover}
                width={132}
                height={74}
                />)
        })

        return (
            <div className="music-player-queue">
                <div className="queue-header">
                    <Image width={30} height={30} path={playlistIcon}/>
                    <h2>Queue</h2>
                </div>
                <div className={"queue-items"}>             
                    <div className="ratings">
                        {ratings.slice(1)}
                    </div>
                    <div className="songs">
                        {songsOnQueue.slice(1)}  
                    </div> 
                </div>
            </div>
        )
    }
}

interface Song {
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
