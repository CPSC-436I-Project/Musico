import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "../Container";
import Header from "../../components/Header";
import profilePlaceholder from "../../icons/profile-placeholder.png";

class HeaderTest extends Container<IHeaderTestProps, IHeaderTestState> {

    public static defaultProps: IHeaderTestProps = {};

    protected constructor(props: IHeaderTestProps) {
        super(props);
        this.state = {};
    }

    public render(): ReactNode {
        return (
            <div style={{width: '100vw'}}>
                <Header profileImgSrc={profilePlaceholder}/>
            </div>
        );
    }
}

export interface IHeaderTestProps extends IContainerProps {
}

export interface IHeaderTestState extends IContainerState {
}

export {HeaderTest};
