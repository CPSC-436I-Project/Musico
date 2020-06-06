import * as React from "react";
import {ReactNode} from "react";
import "./Components.css";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class Header extends EnhancedComponent<IHeaderProps, IHeaderState> {

    public static defaultProps: IHeaderProps = {
        profileImgSrc: ""
    }

    protected constructor(props: IHeaderProps) {
        super(props);
        this.state = {
        };
    }

    public render(): ReactNode {
        return (
            <div className="header">
                
                <a href="#default" className="logo">Musico</a>
                <div className="header-right">
                    <a className="profileImage" href=""><img src={this.props.profileImgSrc} alt="ProfileImage"/></a>
                </div>
            </div>
        );
    }
}

export interface IHeaderProps extends IEnhancedComponentProps {
    profileImgSrc: string,
}

export interface IHeaderState extends IEnhancedComponentState {
}

export {Header};
