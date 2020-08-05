import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Dashboard.css";
import {SongInfoContainer} from "./SongInfoContainer";
import {TextButton} from "./buttons/TextButton";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";

class DashboardSongInfo extends EnhancedComponent<IDashboardSongInfoProps, IDashboardSongInfoState> {

    public static defaultProps: IDashboardSongInfoProps = {
        ...EnhancedComponent.defaultProps,
        width: 250,
        genre: "jazz",
        albumCover: thumbnailPlaceholder,
        songName: "default song name",
    };

    private constructor(props: IDashboardSongInfoProps) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <div className="dashboard-song">
                <SongInfoContainer
                    color={"#ffffff"}
                    width={this.props.width}
                    albumCover = {this.props.albumCover === "" ? thumbnailPlaceholder : this.props.albumCover}
                    songName = {this.props.songName}
                />
                <TextButton
                    text={this.props.genre}
                    fontSize={14}
                    width={100}
                    fontColour={"#ffffff"}
                    buttonColour={"#6236FF"}
                    buttonHoverColour={"#383838"}
                    height={20}
                    onAction={this.props.onButtonClick}
                />
            </div>
        );
    }
}

export interface IDashboardSongInfoProps extends IEnhancedComponentProps {
    width?: number;
    genre: string;
    albumCover: string;
    songName: string;
    onButtonClick?: (callback: () => void) => void;
}

export interface IDashboardSongInfoState extends IEnhancedComponentState {
}

export {DashboardSongInfo};
