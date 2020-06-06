import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import {TextButton} from "../components/buttons/TextButton";

class LoginScreen extends Container {

	public render(): ReactNode {
		return (
			<div
				className={"flex-column-center"}
				style={{
					width: "100%",
					height: "100%"
				}}
			>
				<img/>
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
