import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import "../components/css/Profile.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import { IStore } from "src/redux/initialStore";
import { TextButton, Image } from "src/components";
import { removeUser } from "src/redux/actions/userActions";
import profilePlaceholder from "../icons/profile-placeholder.png";
import { PageEnum } from ".";
import {connect} from "react-redux";

class Profile extends Container<IProfileProps, IProfileState> {

    public static defaultProps: IProfileProps = {
        profileImgUrl: profilePlaceholder
    };

    public static mapStateToProps:(state: IStore, props: IProfileProps) => IProfileProps = (state: IStore, props: IProfileProps) => {
        return {
            ...props,
            profileImgUrl: state.userStore.profileImgSrc,
            username: state.userStore.username,
        };
    }

    logOut = () => {
        this.props.dispatch(removeUser());
        this.props.changePage(PageEnum.LoginScreen)
    }

    public render(): ReactNode {
        return (
            <div className="inner-profile">
                <div className="profile-head">
                    <Image path={this.props.profileImgUrl} width={170} height={170}/>
                    <h2>{this.props.username || "Unknown User"}</h2>
                    <span className="log_out">
                        <TextButton text="Log out" onAction={this.logOut} width={100}/>
                    </span>
                </div>
            </div>
        );
    }
}

export interface IProfileProps extends IContainerProps {
    profileImgUrl?: string;
    username?: string;
}

export interface IProfileState extends IContainerState {

}

// @ts-ignore
export default connect(Profile.mapStateToProps)(Profile);
