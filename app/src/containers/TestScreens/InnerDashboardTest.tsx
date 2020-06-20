import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {InnerDashboard} from "../../components/InnerDashboard";

class InnerDashboardTest extends Container<IInnerDashboardTestProps, IInnerDashboardTestState> {

    public static defaultProps: IInnerDashboardTestProps = {};

    protected constructor(props: IInnerDashboardTestProps) {
        super(props);
        this.state = {};
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Inner Dashboard</h2>
                <InnerDashboard/>
            </div>
        );
    }
}

export interface IInnerDashboardTestProps extends IContainerProps {

}

export interface IInnerDashboardTestState extends IContainerState {

}

export {InnerDashboardTest};
