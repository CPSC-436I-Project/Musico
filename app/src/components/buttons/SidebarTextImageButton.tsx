import * as React from "react";
import {ReactNode} from "react";
import "./Button.css";
import "../css/Sidebar.css";
import {Button, IButtonProps, IButtonState} from "./Button";
import {ITextButtonProps} from "./TextButton";

class SidebarTextImageButton extends Button<ISidebarTextImageButtonProps, ISidebarTextImageButtonState> {

	public static defaultProps: ISidebarTextImageButtonProps = {
		...Button.defaultProps,
		text: "Electronic",
		icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png",
		fontSize: 18,
	};

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
					alt={this.props.text.concat(" icon")}
					className="sidebar-text-image-button-icon"
				/>
				<p
					style={{
						fontSize: this.props.fontSize * (this.props.text.length > 10 ? 0.75 : 1),
						textAlign: "left",
					}}
				>
					{this.props.text}
				</p>
			</div>
		);
	}
}

export interface ISidebarTextImageButtonProps extends IButtonProps, ITextButtonProps {
	icon: string;
	fontSize?: number;
}

export interface ISidebarTextImageButtonState extends IButtonState {

}

export {SidebarTextImageButton};
