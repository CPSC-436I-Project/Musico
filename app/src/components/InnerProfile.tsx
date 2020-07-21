import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Profile.css";
import {Image} from "./Image"
import {IStore} from "../redux/initialStore";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {connect} from "react-redux";

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
            <div className="inner-profile">
                <div className="profile-head">
                    <Image path={this.props.profileImgUrl} width={170} height={170}/>
                    <h2>{this.props.username || "Unknown User"}</h2>
                </div>
            </div>
        );
    }
}

export interface IInnerProfileProps extends IEnhancedComponentProps {
    profileImgUrl?: string;
    username?: string;
}

export interface IInnerProfileState extends IEnhancedComponentState {
}

// @ts-ignore
export default connect(InnerProfile.mapStateToProps)(InnerProfile);
