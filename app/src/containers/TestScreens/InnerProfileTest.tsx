import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import InnerProfile from "../../components/InnerProfile";

class InnerProfileTest extends Container<IInnerProfileTestProps, IInnerProfileTestState> {

    public static defaultProps: IInnerProfileTestProps = {};

    protected constructor(props: IInnerProfileTestProps) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Inner Profile</h2>
                <InnerProfile/>
            </div>
        );
    }
}

export interface IInnerProfileTestProps extends IContainerProps {
}

export interface IInnerProfileTestState extends IContainerState {
}

export {InnerProfileTest};
