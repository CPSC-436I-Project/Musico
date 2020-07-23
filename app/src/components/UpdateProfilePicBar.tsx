import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";
import {TextButton} from "./buttons/TextButton";
import {updateUser} from "../redux/actions/userActions";
import {connect} from "react-redux";


class UpdateProfilePicBar extends EnhancedComponent<IUpdateProfilePicBarProps, IUpdateProfilePicBarState> {
    public static defaultProps: IUpdateProfilePicBarProps = {
        ...EnhancedComponent.defaultProps
    };

    protected constructor(props: IUpdateProfilePicBarProps) {
        super(props);
        this.state = {
            url: ""
        };
        this.updateUrl = this.updateUrl.bind(this);
        this.updateButtonOnClick = this.updateButtonOnClick.bind(this);
    };

    updateUrl = (url: string) => {
        this.setState({url: url.trim()});
    };

    private updateButtonOnClick(callback: () => void): void { // connect this to mongo !!!
        this.props.dispatch(updateUser(this.state.url));
        this.props.onComplete();
        callback();
    }

    public render() {
        return <div className={"update_profile_pic_bar"}>
            <div className={"update_profile_pic_input"}>
                <TextInput
                    defaultText={"Enter profile picture URL here"}
                    submit={this.updateUrl}
                />
            </div>
            <div className={"update_profile_pic_button"}>
                <TextButton
                    text={"Update"}
                    width={100}
                    onAction={this.updateButtonOnClick} // add error handler for invalid urls
                />
            </div>
        </div>
    };
}

export interface IUpdateProfilePicBarProps extends IEnhancedComponentProps {
    onComplete?: any;
}

export interface IUpdateProfilePicBarState extends IEnhancedComponentState {
    url: string;
}

// @ts-ignore
export default connect()(UpdateProfilePicBar);