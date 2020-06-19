import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {DashboardSongInfo} from "./DashboardSongInfo";

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    public render(): ReactNode {
        return (
            <div className="inner_dashboard">
                <h3> Trending Music </h3>
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
