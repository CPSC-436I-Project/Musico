import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {DashboardSongInfo} from "./DashboardSongInfo";
import {Image} from "./Image"

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    public render(): ReactNode {
        const audioWaveIcon = "https://img.icons8.com/nolan/64/audio-wave.png"
        return (
            <div className="inner_dashboard">
                <div 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flexstart",
                    }}
                >
                    <Image width={40} height={40} path={audioWaveIcon}/>
                    <h2> Trending Music </h2>
                </div>
                <div className="dashboard_trending">
                    <DashboardSongInfo genre={"Electronic"}/>
                    <DashboardSongInfo genre={"Hip-Hop"}/>
                    <DashboardSongInfo genre={"Jazz"}/>
                </div>
            </div>);
    }
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
}

export {InnerDashboard};
