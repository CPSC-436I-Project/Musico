import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";
import {TextButton} from "./buttons/TextButton";
import {updateUser} from "../redux/actions/userActions";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import "./css/Components.css";

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

    private profileTesterRef: any;

    protected constructor(props: IUpdateProfilePicBarProps) {
        super(props);
        this.state = {
            url: "",
            error: ""
        };
        this.updateUrl = this.updateUrl.bind(this);
        this.updateButtonOnClick = this.updateButtonOnClick.bind(this);
        this.invalidUserError = this.invalidUserError.bind(this);
        this.updateProfileSuccess = this.updateProfileSuccess.bind(this);
        this.updateProfileFail = this.updateProfileFail.bind(this);
        this.updateButtonOnClick = this.updateButtonOnClick.bind(this);
    };

    /**
     * Update the state's url with the given string
     *
     * @param url {string} - The url string
     * @private
     */
    private updateUrl(url: string): void {
        this.setState({url: url.trim()});
    };

    /**
     * Callback that occurs when the inputted url is a valid image url.
     * Sends a request to set the given url as the user's avatar.
     *
     * @private
     */
    private updateProfileSuccess(): void {
        if (this.state.url) {
            this.props.dispatch(updateUser(this.state.url, this.invalidUserError));
            this.props.onComplete();
        }
    }

    /**
     * Callback that occurs when the inputted url is an invalid image url.
     * Display the error message
     *
     * @private
     */
    private updateProfileFail(): void {
        if (this.state.url) {
            this.setState({error: "Invalid URL"});
        }
    }

    /**
     * Callback for when the user update process fails.
     *
     * @param message {string} - The error string to display
     * @private
     */
    private invalidUserError(message: string): void {
        this.setState({error: message});
    }

    /**
     * the onClick function of the button to update the profile picture
     *
     * @param callback {() => void} - the callback function to let the button be clickable again
     * @private
     */
    private updateButtonOnClick(callback: () => void): void {
        // validate URL
        this.profileTesterRef.src = this.state.url;
        callback();
    };

    public render() {
        return (
            <div className={"update_profile_pic_bar"}>
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
                <div style={{visibility: "hidden"}}>
                    <img
                        src={""}
                        alt={""}
                        onLoad={this.updateProfileSuccess}
                        onError={this.updateProfileFail}
                        ref={(ref) => {
                            this.profileTesterRef = ref;
                        }}
                    />
                </div>
            </div>
        )
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
