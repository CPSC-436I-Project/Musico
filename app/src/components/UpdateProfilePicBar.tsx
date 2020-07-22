import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class UpdateProfilePicBar extends EnhancedComponent<IUpdateProfilePicBarProps, IUpdateProfilePicBarState> {
    public static defaultProps: IUpdateProfilePicBarProps = {
        ...EnhancedComponent.defaultProps,
        shown: false
    };

    protected constructor(props: IUpdateProfilePicBarProps) {
        super(props);
    }

    public render() {
        if (this.props.shown) {
            return <div> UPDATE PROFILE BAR WILL BE HERE </div>
        } else {
            return null;
        }
    }
}

export interface IUpdateProfilePicBarProps extends IEnhancedComponentProps {
    shown: boolean
}

export interface IUpdateProfilePicBarState extends IEnhancedComponentState {
}

export {UpdateProfilePicBar};