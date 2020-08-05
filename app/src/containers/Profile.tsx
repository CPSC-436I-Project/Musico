import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import "../components/css/Profile.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import { IStore } from "src/redux/initialStore";
import { removeUser } from "src/redux/actions/userActions";
import profilePlaceholder from "../icons/profile-placeholder.png";
import { PageEnum } from ".";
import {connect} from "react-redux";
import InnerProfile from "../components/InnerProfile";

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
            <InnerProfile/>
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
