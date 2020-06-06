import * as React from "react";
import {ReactNode} from "react";
import "./SidebarTextImageButton.css";
import {Button, IButtonProps, IButtonState} from "./Button";

class SidebarTextImageButton extends Button<ISidebarTextImageButtonProps, ISidebarTextImageButtonState> {

	protected constructor(props: ISidebarTextImageButtonProps) {
		super(props);
		this.state = {
			...this.state,
		};
	}

	public render(): ReactNode {
		return (
			<div className="sidebar-text-image-button">
                <img
                    src={this.props.icon}
                    alt={this.props.genre.concat(" icon")}
                    className="sidebar-text-image-button-icon"
				/>
                {this.props.genre}
            </div>
		);
	}
}

export interface ISidebarTextImageButtonProps extends IButtonProps {
	genre: string;
	icon: string;
}

export interface ISidebarTextImageButtonState extends IButtonState {

}

export {SidebarTextImageButton};
