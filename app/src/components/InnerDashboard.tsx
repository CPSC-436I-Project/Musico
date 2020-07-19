import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {DashboardSongInfo} from "./DashboardSongInfo";
import {Image} from "./Image"
import {GenreEnum} from "./index";

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    // NEW FN TO PULL DB INFO

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

                    // UPDATE THESE TO GET DATA FROM DB!!!

                    {/*<DashboardSongInfo genre={GenreEnum.ELECTRONIC}/>*/}
                    {/*<DashboardSongInfo genre={GenreEnum.HIP_HOP}/>*/}
                    {/*<DashboardSongInfo genre={GenreEnum.JAZZ}/>*/}
                </div>
            </div>);
    }
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
}

export {InnerDashboard};
