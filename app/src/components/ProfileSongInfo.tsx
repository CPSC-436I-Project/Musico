import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg"

class ProfileSongInfo extends EnhancedComponent<IProfileSongInfoProps, IProfileSongInfoState> {
    public static defaultProps: IProfileSongInfoProps = {
        ...EnhancedComponent.defaultProps,
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
        this.props.artists.forEach(function (a) {
            artistsString += ", " + a;
        });
        let artists = artistsString.substring(2);
        return (
            <div className={"profile_song_info_container"}>
                <div className={"profile_song_image"}>
                    <Image
                        path={this.props.pic === "" ? thumbnailPlaceholder : this.props.pic}
                        name={"Album"}
                        width={this.props.width}
                        height={this.props.height}
                    />
                </div>
                <div className={"profile_song_description_container"}>
                    <p className={"profile_song_description"}>{this.props.name} <br/> {artists}</p>
                </div>
            </div>
        )
    }
}

export interface IProfileSongInfoProps extends IEnhancedComponentProps {
    width?: number,
    height?: number,
    pic?: string,
    name?: string,
    artists?: string[]
}

export interface IProfileSongInfoState extends IEnhancedComponentState {
}

export {ProfileSongInfo};