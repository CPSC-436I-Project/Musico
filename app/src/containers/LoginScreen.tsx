import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {TextButton} from "../components/buttons/TextButton";
import {Image} from "../components/Image";

class LoginScreen extends Container {

	public render(): ReactNode {
		return (
			<div
				className={"fill-container center-mid"}
			>
				<div style={{
					marginBottom: 180,
				}}>
					<Image path={"/logo.png"} width={600} height={140}/>
				</div>
				<TextButton
					text={"Login"}
					width={250}
					height={50}
					fontSize={24}
					bold={true}
					buttonColour={"#6236FF"}
					buttonFocusedColour={"#431cd7"}
					buttonHoverColour={"#815cff"}
				/>
				<div style={{height: 10}}/>
				<TextButton
					text={"Sign Up"}
					width={250}
					height={50}
					fontSize={24}
					bold={true}
					buttonColour={"#7D7D7D"}
					buttonFocusedColour={"#535353"}
					buttonHoverColour={"#999999"}
				/>
			</div>
		);
	}
}

export {LoginScreen};
