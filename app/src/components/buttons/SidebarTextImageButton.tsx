import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import "./SidebarTextImageButton.css";

class SidebarTextImageButton<P extends IButtonProps = IButtonProps, S extends IButtonState = IButtonState> extends EnhancedComponent<P, S> {

	protected constructor(props: P) {
		super(props);
		// @ts-ignore
		this.state = {
			clicked: false,
			genre: this.props.genre,
			icon: this.props.icon
		};
	}

	public render(): ReactNode {
		console.log("PROPS:", this.props);
		return (
			<button className="sidebar-text-image-button">
                <img 
                    src={this.props.icon}
                    alt={this.props.genre.concat(" icon")}
                    className="sidebar-text-image-button-icon"
                    >
                </img>
                {this.props.genre}
            </button>
		);
	}
}

export interface IButtonProps extends IEnhancedComponentProps {
	genre: string;
	icon: string;
}

export interface IButtonState extends IEnhancedComponentState {
	clicked: boolean;
	genre: string;
	icon: string;
}

export {SidebarTextImageButton};