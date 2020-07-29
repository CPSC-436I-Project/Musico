import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Dashboard.css";
import {SongInfoContainer} from "./SongInfoContainer";
import {TextButton} from "./buttons/TextButton";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";
import {GenreEnum} from ".";
import Room from "../containers/Room";

class DashboardSongInfo extends EnhancedComponent<IDashboardSongInfoProps, IDashboardSongInfoState> {

    public static defaultProps: IDashboardSongInfoProps = {
        ...EnhancedComponent.defaultProps,
        width: 250,
        genre: "jazz",
        albumCover: thumbnailPlaceholder,
        songName: "default song name",
        artists: ["artist1", "artist2"],
    };

    private constructor(props: IDashboardSongInfoProps) {
        super(props);

        this.state = {
            render: false,
        }

        this.renderRoom = this.renderRoom.bind(this);
    }

    private renderRoom(genre: any) {
        return (
            <Room selectedGenre={genre}/>
        )
    }

    public render(): ReactNode {
        return (
            <div className="dashboard-song">
                <SongInfoContainer
                    color={"#ffffff"}
                    width={this.props.width}
                    albumCover = {this.props.albumCover === "" ? thumbnailPlaceholder : this.props.albumCover}
                    songName = {this.props.songName}
                    artists = {this.props.artists}
                />
                <TextButton text={this.props.genre}
                            fontSize={14} width={100}
                            fontColour={"#ffffff"}
                            buttonColour={"#6236FF"}
                            buttonHoverColour={"#383838"}
                            height={20}
                            onAction={this.renderRoom(this.props.genre)}
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
    artists: string[];
}

export interface IDashboardSongInfoState extends IEnhancedComponentState {
    render?: boolean;
}

export {DashboardSongInfo};