import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {Image} from "../components";

class Profile extends Container<IProfileProps, IProfileState> {

    public render(): ReactNode {
        return (
            <div>
               <div className="profile-head">
                   <Image path={this.props.profileImgUrl}/>
                   <h2>{this.props.username}</h2>
               </div>
               <div className="profile-played-songs">

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

export {Profile};
