import * as React from "react";
import {ReactNode} from "react";
import "./Components.css";

abstract class EnhancedComponent<P extends IEnhancedComponentProps = IEnhancedComponentProps,
	S extends IEnhancedComponentState = IEnhancedComponentState> extends React.PureComponent<P, S> {

	public static defaultProps: IEnhancedComponentProps = {
		/* add default props that belong to every component */
	}

	private readonly childRender: () => ReactNode;

	protected constructor(props: P) {
		super(props);
		// @ts-ignore
		this.state = {
			reduxTest: 0,
		};

		this.childRender = this.render;
		this.wrapRender = this.wrapRender.bind(this);
		this.wrapRender();
	}

	private wrapRender(): void {
		this.render = (): ReactNode => {
			return(
				<div>
					{this.childRender()}
				</div>
			);
		};
	}
}

export interface IEnhancedComponentProps {
}

export interface IEnhancedComponentState {
	reduxTest?: number;
}

export {EnhancedComponent};
