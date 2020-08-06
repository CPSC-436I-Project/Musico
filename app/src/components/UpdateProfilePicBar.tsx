import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";
import {TextButton} from "./buttons/TextButton";
import {updateUser} from "../redux/actions/userActions";
import {connect} from "react-redux";
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

	private profileTester: any;
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

	private updateUrl(url: string): void {
		this.setState({url: url.trim()});
	};

	private updateProfileSuccess(): void {
		if (this.state.url) {
			this.props.dispatch(updateUser(this.state.url, this.invalidUserError));
			this.props.onComplete();
		}
	}

	private updateProfileFail(): void {
		if (this.state.url) {
			this.setState({error: "Invalid URL"});
		}
	}

	private invalidUserError(message: string): void {
		this.setState({error: message});
	}

	private updateButtonOnClick(callback: () => void): void {
		// validate URL
		this.profileTesterRef.src = this.state.url;
		callback();
	};

	public render() {
		return (
			<div className={"update_profile_pic_bar"}>
				<div className="error-message flex-column-center" style={{color: "red"}}>
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
						ref={(ref) => {this.profileTesterRef = ref; }}
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
