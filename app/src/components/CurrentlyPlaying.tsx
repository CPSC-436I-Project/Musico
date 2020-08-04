import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";
import { ISongInterface, defaultSong } from "src/utility/songs";
import { GenreEnum } from ".";

class CurrentlyPlaying extends EnhancedComponent<ICurrentlyPlayingProps, ICurrentlyPlayingState> {
    public static defaultProps: ICurrentlyPlayingProps = {
        ...EnhancedComponent.defaultProps,
    };

    protected constructor(props: ICurrentlyPlayingProps) {
        super(props);
    }

    getStartSeconds = (time: string) => {
        if (time === undefined || time === null) {
            return 0;
        }
        let startTime = new Date(time);
        let currentTime = new Date();
        return Math.floor((currentTime.getTime() - startTime.getTime()) / 1000); 
    }

    public render() {
        let start = this.getStartSeconds(this.props.startTime)
        return (
            <div className="currently-playing">
                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%" /* 16:9 */,
                        paddingTop: 25,
                        height: 0
                    }}
                >
                    <iframe
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                        }}
                        src={this.props.song.src.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/") + "?rel=0&autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0&start="+start}
                        frameBorder={"0"}
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
