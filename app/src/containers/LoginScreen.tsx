import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {TextButton, Image, ExpandableButton, TextInput} from "../components";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {IAddSongFormProps} from "../components/AddSongForm";
import {createUser, loginUser} from "../redux/actions";

class LoginScreen extends Container {

	public static mapStateToProps: (state: IStore, props: any) => IAddSongFormProps = (state: IStore, props: any) => {
		return {
			...props,
			username: state.userStore.username,
			email: state.userStore.email,
		};
	}

	private loginUserNameTextRef: TextInput;
	private loginPasswordTextRef: TextInput;
	private signUpUserNameTextRef: TextInput;
	private signUpPasswordTextRef: TextInput;
	private signUpEmailTextRef: TextInput;

	protected constructor(props: any) {
		super(props);

		this.loginButtonOnClick = this.loginButtonOnClick.bind(this);
		this.signUpButtonOnClick = this.signUpButtonOnClick.bind(this);

	}

	private loginButtonOnClick(callback: () => void): void {
		this.props.dispatch(loginUser(this.loginUserNameTextRef.getText(), this.loginPasswordTextRef.getText()));
		callback();
	}

	private signUpButtonOnClick(callback: () => void): void {
		this.props.dispatch(createUser(this.signUpUserNameTextRef.getText(), this.signUpEmailTextRef.getText(), this.signUpPasswordTextRef.getText()));
		callback();
	}

	public render(): ReactNode {
		const loginButtonChild: ReactNode = <div className={"flex-column-center"}>
			<TextInput
				defaultText={"username"}
				ref={(ref: TextInput) => {this.loginUserNameTextRef = ref; }}
			/>
			<TextInput
				defaultText={"password"}
				ref={(ref: TextInput) => {this.loginPasswordTextRef = ref; }}
			/>
			<TextButton text={"Done!"} width={70} onAction={this.loginButtonOnClick}/>
		</div>;

		const signUpButtonChild: ReactNode = <div className={"flex-column-center"}>
			<TextInput
				defaultText={"username"}
				ref={(ref: TextInput) => {this.signUpUserNameTextRef = ref; }}
			/>
			<TextInput
				defaultText={"password"}
				ref={(ref: TextInput) => {this.signUpPasswordTextRef = ref; }}
			/>
			<TextInput
				defaultText={"email"}
				ref={(ref: TextInput) => {this.signUpEmailTextRef = ref; }}
			/>
			<TextButton text={"Done!"} width={70} onAction={this.signUpButtonOnClick}/>
		</div>;

		return (
			<div
				className={"fill-container center-mid"}
			>
				<div style={{
					marginBottom: 180,
				}}>
					<Image path={"/logo.png"} width={600} height={140}/>
				</div>
				<div className={"flex-column-center"}>
					<ExpandableButton
						buttonHoverColour={"#6236ff"}
						buttonColour={"#6236ff"}
						text={"Login"}
						width={350}
						child={loginButtonChild}
					/>
					<div style={{height: 10}}/>
					<ExpandableButton
						text={"Sign Up"}
						width={350}
						child={signUpButtonChild}
					/>
				</div>
			</div>
		);
	}
}

// @ts-ignore
export default connect(LoginScreen.mapStateToProps)(LoginScreen);
