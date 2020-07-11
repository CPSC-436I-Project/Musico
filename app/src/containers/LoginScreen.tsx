import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {TextButton, Image, ExpandableButton, TextInput} from "../components";

class LoginScreen extends Container {

	public render(): ReactNode {
		const loginButtonChild: ReactNode = <div className={"flex-column-center"}>
			<TextInput
				defaultText={"username"}
			/>
			<TextInput
				defaultText={"password"}
			/>
			<TextButton text={"Done!"} width={70}/>
		</div>;

		const signUpButtonChild: ReactNode = <div className={"flex-column-center"}>
			<TextInput
				defaultText={"username"}
			/>
			<TextInput
				defaultText={"password"}
			/>
			<TextInput
				defaultText={"email"}
			/>
			<TextButton text={"Done!"} width={70}/>
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

export {LoginScreen};
