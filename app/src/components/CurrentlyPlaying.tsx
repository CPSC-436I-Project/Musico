import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ISongInterface} from "src/utility/songs";
import YouTube from 'react-youtube';

class CurrentlyPlaying extends EnhancedComponent<ICurrentlyPlayingProps, ICurrentlyPlayingState> {

    public static defaultProps: ICurrentlyPlayingProps = {
        ...EnhancedComponent.defaultProps,
    };

    protected constructor(props: ICurrentlyPlayingProps) {
        super(props);
    }

    /**
     * Calculate the startTime for the Embedded YouTube video
     *
     * @param time {string} - the DateString of when the DB started playing the song
     * @return {number} the start time in seconds
     */
    getStartSeconds = (time: string): number => {
        if (time === undefined || time === null) {
            return 0;
        }
        let startTime = new Date(time);
        let currentTime = new Date();
        return Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
    };

    public render() {
        const opts: any = {
            playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
                autohide: 1,
                showinfo: 0,
                controls: 0,
                start: this.getStartSeconds(this.props.startTime),
            },
        };
        return (
            <div className="currently-playing">
                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%", /* 16:9 */
                        paddingTop: 25,
                        height: 0
                    }}
                >
                    <YouTube
                        containerClassName="youtube-player"
                        videoId={this.props.song.src.replace("https://www.youtube.com/watch?v=", "")}
                        opts={opts}
                    />
                </div>
                <p>Currently Playing: {this.props.song.songName}</p>
            </div>
        )
    }
}

export interface ICurrentlyPlayingProps extends IEnhancedComponentProps {
    song?: ISongInterface;
    startTime?: string;
}

export interface ICurrentlyPlayingState extends IEnhancedComponentState {
}

export {CurrentlyPlaying};
