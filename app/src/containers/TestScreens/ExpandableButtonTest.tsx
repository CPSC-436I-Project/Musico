import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";
import {ExpandableButton} from "../../components";

class ExpandableButtonTest extends Container {
	public render(): ReactNode {
		return (
			<div className={"flex-column-center"}>
				<h2>Expandable Buttons</h2>
				<ExpandableButton/>
			</div>
		);
	}
}

export {ExpandableButtonTest};
