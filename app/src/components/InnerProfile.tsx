import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {Image} from "./Image"
import {IStore} from "../redux/initialStore";
import profilePlaceholder from "../icons/profile-placeholder.png";

class InnerProfile extends EnhancedComponent<IInnerProfileProps, IInnerProfileState> {

    public static defaultProps: IInnerProfileProps = {
        ...EnhancedComponent.defaultProps,
        profileImgUrl: profilePlaceholder
    };

    public static mapStateToProps:(state: IStore, props: IInnerProfileProps) => IInnerProfileProps = (state: IStore, props: IInnerProfileProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc,
            username: state.userStore.username,
        };
    }

    public render(): ReactNode {
        return (
            <div className="inner_profile">
                <div className="profile-head">
                    <Image path={this.props.profileImgUrl}/>
                    <h2>{this.props.username}</h2>
                </div>
                <div className="profile-played-songs">
                    TODO
                </div>
            </div>);
    }
}

export interface IInnerProfileProps extends IEnhancedComponentProps {
    profileImgUrl?: string;
    username?: string;
}

export interface IInnerProfileState extends IEnhancedComponentState {
}

export {InnerProfile};
