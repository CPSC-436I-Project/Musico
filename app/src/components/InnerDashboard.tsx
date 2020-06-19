import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {SongInfoContainer} from "./SongInfoContainer";
import {TextButton} from "./buttons/TextButton";

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    public render(): ReactNode {
        return (
            <div className="inner_dashboard">
                <h3> Trending Music </h3>
                <div className="dashboard_trending">
                    <div className="dashboard_song">
                        <SongInfoContainer color={"#000000"}/>
                        <TextButton text={"Electronic"} fontSize={10} width={75}/>
                    </div>
                    <div className="dashboard_song">
                        <SongInfoContainer color={"#000000"}/>
                        <TextButton text={"Hip-Hop"} fontSize={10} width={75}/>
                    </div>
                    <div className="dashboard_song">
                        <SongInfoContainer color={"#000000"}/>
                        <TextButton text={"Jazz"} fontSize={10} width={75}/>
                    </div>
                </div>
            </div>);
    }
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
}

export {InnerDashboard};
