import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {SongInfoContainer} from "./SongInfoContainer";
import {TextButton} from "./buttons/TextButton";
import {GenreEnum} from "./index";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";

class DashboardSongInfo extends EnhancedComponent<IDashboardSongInfoProps, IDashboardSongInfoState> {

    public static defaultProps: IDashboardSongInfoProps = {
        ...EnhancedComponent.defaultProps,
        genre: null,
        pic: thumbnailPlaceholder,
        name: "default song name",
        artists: ["artist1", "artist2"],
    };

    private constructor(props: IDashboardSongInfoProps) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <div className="dashboard_song">
                <SongInfoContainer
                    color={"#000000"}
                    pic = {this.props.pic}
                    name = {this.props.name}
                    artists = {this.props.artists}
                />
                <TextButton text={this.props.genre}
                            fontSize={14} width={100}
                            fontColour={"#ffffff"}
                            buttonColour={"#000000"}
                            buttonHoverColour={"#000000"}
                            height={20}
                />
            </div>
        );
    }
}

export interface IDashboardSongInfoProps extends IEnhancedComponentProps {
    genre: GenreEnum | null;
    pic: string;
    name: string;
    artists: string[];
}

export interface IDashboardSongInfoState extends IEnhancedComponentState {
}

export {DashboardSongInfo};