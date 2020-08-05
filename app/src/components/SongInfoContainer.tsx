import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg"
import "./css/Dashboard.css";


class SongInfoContainer extends EnhancedComponent<ISongInfoContainerProps, ISongInfoContainerState> {
    public static defaultProps: ISongInfoContainerProps = {
        ...EnhancedComponent.defaultProps,
        color: "#ffffff",
        songName: "default",
        albumCover: thumbnailPlaceholder,
        width: 250,
        height: 150,
    };

    protected constructor(props: ISongInfoContainerProps) {
        super(props);
    }

    public render() {
        return (
            <div className={"song-info-container"} style={{color: this.props.color, width: this.props.width}} >
                <Image
                    path={this.props.albumCover || thumbnailPlaceholder}
                    name={"Album"}
                    width={this.props.width}
                    height={this.props.height}
                />
                <div className={"song-description-container"}>
                    <p className={"song-description"}>{this.props.songName}</p>
                </div>
            </div>
        )
    }
}

export interface ISongInfoContainerProps extends IEnhancedComponentProps {
    color?: string,
    width?: number,
    height?: number,
    songName?: string,
    albumCover?: string,
}

export interface ISongInfoContainerState extends IEnhancedComponentState {
}

export {SongInfoContainer};
