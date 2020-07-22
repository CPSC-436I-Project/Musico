import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";
import {TextButton} from "./buttons/TextButton";

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
            return <div className={"update_profile_pic_bar"}>
                <div className={"update_profile_pic_input"}>
                    <TextInput
                        defaultText={"Enter profile picture URL here"}
                    />
                </div>
                <div className={"update_profile_pic_button"}>
                    <TextButton
                        text={"Update"}
                        width={100}
                    />
                </div>
            </div>
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