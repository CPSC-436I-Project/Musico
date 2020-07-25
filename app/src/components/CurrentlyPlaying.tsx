import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";

class CurrentlyPlaying extends EnhancedComponent<ICurrentlyPlayingProps, ICurrentlyPlayingState> {
    public static defaultProps: ICurrentlyPlayingProps = {
        ...EnhancedComponent.defaultProps,
        song: {
            songName: "default",
            artists: [],
            genre: "Pop",
            src: "",
            requesterID: 0,
            albumCover: "",
            numVotes: 0
        }
    };

    protected constructor(props: ICurrentlyPlayingProps) {
        super(props);
    }

    public render() {
        let artistsString = "";
        this.props.song.artists.map(artist => artistsString += ", " + artist);
        let artists = artistsString.substring(2);

        console.log(this.props.song)

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
                        src={this.props.song.src.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/") + "?rel=0&autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0"}
                        frameBorder={"0"}
                    />
                </div>
                <p>Currently Playing: {this.props.song.songName}</p>
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

export interface ICurrentlyPlayingProps extends IEnhancedComponentProps {
    song?: Song;
}

export interface ICurrentlyPlayingState extends IEnhancedComponentState {

}

export {CurrentlyPlaying};
