import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {SongInfoContainer} from "./SongInfoContainer";

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    public render(): ReactNode {
        return (
            <div className="inner_dashboard">
                <h3> Trending Music </h3>
                <div className="dashboard_trending">
                    <SongInfoContainer color={"#000000"}/>
                    <SongInfoContainer color={"#000000"}/>
                    <SongInfoContainer color={"#000000"}/>
                </div>
            </div>);
    }
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
}

export {InnerDashboard};
