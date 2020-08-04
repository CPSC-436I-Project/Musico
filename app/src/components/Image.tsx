import * as React from "react";
import "./css/Components.css";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";

class Image extends EnhancedComponent<IImageProps, IImageState> {
	public static defaultProps: IImageProps = {
		...EnhancedComponent.defaultProps,
		path: "/logo.png",
		rounded: false,
		backgroundColour: "transparent",
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
				className={("unselectable " + this.props.className || "")}
				style={{
					objectFit: "cover",
					verticalAlign: "middle",
					width: this.props.width,
					height: this.props.height,
					borderRadius: this.props.rounded ? 500 : 0,
					backgroundColor: this.props.backgroundColour,
				}}
			/>
		)
	}
}

export interface IImageProps extends IEnhancedComponentProps{
	name?: string;
	path: string;
	width?: number;
	height?: number;
	className?: string;
	rounded?: boolean;
	backgroundColour?: string;
}

export interface IImageState extends IEnhancedComponentState {

}

export {Image};
