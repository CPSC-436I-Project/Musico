import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {Image} from "./Image"
import {IStore} from "../redux/initialStore";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {connect} from "react-redux";
import { TextButton } from "./buttons/TextButton";
import { removeUser } from "src/redux/actions/userActions";

class InnerProfile extends EnhancedComponent<IInnerProfileProps, IInnerProfileState> {

    public static defaultProps: IInnerProfileProps = {
        ...EnhancedComponent.defaultProps,
        profileImgSrc: profilePlaceholder
    };

    private constructor(props: IInnerProfileProps) {
        super(props);
    }
    
    public static mapStateToProps:(state: IStore, props: IInnerProfileProps) => IInnerProfileProps = (state: IStore, props: IInnerProfileProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc,
            username: state.userStore.username,
            requests: state.userStore.requests,
            likedSongs: state.userStore.likedSongs,
            favouriteGenres: state.userStore.favouriteGenres,
            channels: state.userStore.channels
        };
    };

    logOut = () => {
        this.props.dispatch(removeUser());
        // TODO: route to the <App> so that login screen is shown or refresh the page
    };

    public render(): ReactNode {
        return (
            <div className="inner_profile">
                <div className="profile_head">
                    <Image path={this.props.profileImgSrc} width={170} height={170}/>
                    <h2>{this.props.username || "Unknown User"}</h2>
                    <span className="log_out">
                        <TextButton text="Log out" onAction={this.logOut} width={100}/>
                    </span>
                </div>
            </div>
        );
    }
}

export interface IInnerProfileProps extends IEnhancedComponentProps {
    profileImgSrc?: string;
    username?: string;
    requests?: string[];
    likedSongs?: string[];
    favouriteGenres?: string[];
    channels?: string[];
}

export interface IInnerProfileState extends IEnhancedComponentState {
}

// @ts-ignore
export default connect(InnerProfile.mapStateToProps)(InnerProfile);
