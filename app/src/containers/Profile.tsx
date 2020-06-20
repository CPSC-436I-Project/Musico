import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {InnerProfile} from "../components/InnerProfile";

//TODO: this is incomplete
class Profile extends Container<IProfileProps, IProfileState> {

    public render(): ReactNode {
        return (
            <div>
                <InnerProfile />
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
