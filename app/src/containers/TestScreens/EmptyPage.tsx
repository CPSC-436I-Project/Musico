import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";

class EmptyPage extends Container {

	public render(): ReactNode {
		return (
			<div/>
		);
	}
}

export {EmptyPage};
