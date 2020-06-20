import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";
import {ExpandableButton, TextInput} from "../../components";

class ExpandableButtonTest extends Container {
	public render(): ReactNode {
		const emptyChild: ReactNode = <div style={{height: 100, width: 500}}/>;
		const loginButtonChild: ReactNode = <div className={"flex-column-center"}>
				<TextInput
					defaultText={"username"}
				/>
				<TextInput
					defaultText={"password"}
				/>
		</div>;
		return (
			<div className={"flex-column-center"}>
				<h2>Expandable Buttons</h2>
				<ExpandableButton
					text={"Click to expand"}
					width={400}
					child={emptyChild}
				/>
				<ExpandableButton
					text={"Login"}
					width={350}
					child={loginButtonChild}
				/>
			</div>
		);
	}
}

export {ExpandableButtonTest};
