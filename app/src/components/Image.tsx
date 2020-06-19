import * as React from "react";
import "./Components.css";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class Image extends EnhancedComponent<IImageProps, IImageState> {
	public static defaultProps: IImageProps = {
		...EnhancedComponent.defaultProps,
		path: "/logo.png",
	};

	protected constructor(props: IImageProps) {
		super(props);
		this.state = {

		};
	}

	public render() {
		return (
			<img
				src={this.props.path}
				alt={this.props.name}
				className={"unselectable"}
				style={{objectFit: "cover",
						verticalAlign: "middle"}}
			/>
		)
	}
}

export interface IImageProps extends IEnhancedComponentProps{
	name?: string;
	path: string;
}

export interface IImageState extends IEnhancedComponentState {

}

export {Image};
