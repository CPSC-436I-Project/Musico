import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg"

class ProfileSongInfo extends EnhancedComponent<IProfileSongInfoProps, IProfileSongInfoState> {
    public static defaultProps: IProfileSongInfoProps = {
        ...EnhancedComponent.defaultProps,
        color: "#ffffff",
        width: 125,
        height: 75,
        pic: thumbnailPlaceholder,
        name: "default song name",
        artists: ["artist1", "artist2"]
    };

    protected constructor(props: IProfileSongInfoProps) {
        super(props);
    }

    public render() {
        let artistsString = "";
        this.props.artists.map(function (a) {
            artistsString += ", " + a;
        });
        let artists = artistsString.substring(2);
        return (
            <div className={"profile-song-info-container"} style={{
                color: this.props.color,
                width: this.props.width
            }}>
                <Image
                    path={this.props.pic}
                    name={"Album"}
                    width={this.props.width}
                    height={this.props.height}
                />
                <p className={"song-description"}>{this.props.name} <br/> {artists}</p>
            </div>
        )
    }
}

export interface IProfileSongInfoProps extends IEnhancedComponentProps {
    color?: string,
    width?: number,
    height?: number,
    pic?: string,
    name?: string,
    artists?: string[],
    genre?: string
}

export interface IProfileSongInfoState extends IEnhancedComponentState {
}

export {ProfileSongInfo};