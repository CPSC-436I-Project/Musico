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

        return (
            <div className="currently-playing">
                <Image
                    path={thumbnailPlaceholder}
                    name={"Album"}
                    width={204}
                    height={115}
                />
                <p>Currently Playing: {this.props.song.songName} by {artists}</p>
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
