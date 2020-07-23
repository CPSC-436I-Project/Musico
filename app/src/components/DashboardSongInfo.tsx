import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Dashboard.css";
import {SongInfoContainer} from "./SongInfoContainer";
import {TextButton} from "./buttons/TextButton";

class DashboardSongInfo extends EnhancedComponent<IDashboardSongInfoProps, IDashboardSongInfoState> {

    public static defaultProps: IDashboardSongInfoProps = {
        ...EnhancedComponent.defaultProps,
        genre: "default",
    };

    private constructor(props: IDashboardSongInfoProps) {
        super(props);
        this.state = {
        };
    }

    public render(): ReactNode {
        return (
            <div className="dashboard_song">
                <SongInfoContainer color={"#000000"}/>
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
    genre: string;
}

export interface IDashboardSongInfoState extends IEnhancedComponentState {
}

export {DashboardSongInfo};