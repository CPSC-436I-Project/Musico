import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";
import {TextButton} from "./buttons/TextButton";
import {invalidUserUpdate, updateUser} from "../redux/actions/userActions";
import {connect} from "react-redux";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {IStore} from "../redux/initialStore";


class UpdateProfilePicBar extends EnhancedComponent<IUpdateProfilePicBarProps, IUpdateProfilePicBarState> {
    public static defaultProps: IUpdateProfilePicBarProps = {
        ...EnhancedComponent.defaultProps
    };

    public static mapStateToProps: (state: IStore, props: IUpdateProfilePicBarProps) =>
        IUpdateProfilePicBarProps = (state: IStore, props: IUpdateProfilePicBarProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc
        };
    };

    protected constructor(props: IUpdateProfilePicBarProps) {
        super(props);
        this.state = {
            url: "",
            error: ""
        };
        this.updateUrl = this.updateUrl.bind(this);
        this.updateButtonOnClick = this.updateButtonOnClick.bind(this);
        this.invalidUserError = this.invalidUserError.bind(this);
        this.validateUrl = this.validateUrl.bind(this);
    };

    updateUrl = (url: string) => {
        this.setState({url: url.trim()});
    };

    private validateUrl(): Promise<boolean> {
        if (!(this.state.url.includes("http://", 0) || this.state.url.includes("https://"))) {
            return new Promise<boolean>(function(resolve, reject) {
                resolve(false);
            });
        }
        return fetch(this.state.url)
            .then(res => {
                return res.status === 200
            })
            .catch(() => {
                return false;
            })
    }

    private invalidUserError(message: string) {
        this.setState({error: message});
    }

    updateButtonOnClick = (callback: () => void) => {
        this.validateUrl()
            .then(res => {
                if (res) {
                    this.props.dispatch(updateUser(this.state.url, this.invalidUserError));
                    this.props.onComplete();
                    callback();
                } else {
                    this.props.dispatch(invalidUserUpdate(profilePlaceholder));
                    this.setState({
                        error: "Invalid URL"
                    }, callback)
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    public render() {
        return <div className={"update_profile_pic_bar"}>
            <div className="error-message flex-column-center">
                {this.state.error}
            </div>
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
                    onAction={this.updateButtonOnClick}
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
    error: string;
}

// @ts-ignore
export default connect(UpdateProfilePicBar.mapStateToProps)(UpdateProfilePicBar);
