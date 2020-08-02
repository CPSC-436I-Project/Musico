import * as React from "react";
import {ReactNode} from "react";
import "./Button.css";
import "../css/Sidebar.css";
import {Button, IButtonProps, IButtonState} from "./Button";
import {ITextButtonProps, TextButton} from "./TextButton";
import {EnhancedComponent} from "../EnhancedComponent";
import {ImageButton} from "./ImageButton";

class SidebarTextImageButton extends EnhancedComponent<ISidebarTextImageButtonProps, ISidebarTextImageButtonState> {

    public static defaultProps: ISidebarTextImageButtonProps = {
        ...EnhancedComponent.defaultProps,
        text: "Electronic",
        icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png",
    };

    protected constructor(props: ISidebarTextImageButtonProps) {
        super(props);
        this.state = {
			...this.state,
        	liked: false
        };
        this.genreLiked = this.genreLiked.bind(this);
    }

    genreLiked = (callback: () => void) => {
    	this.setState({liked: !this.state.liked}, callback);
	};

    public render(): ReactNode {
        return (
            <div className="sidebar-text-image-button">
                <div>
                    <ImageButton
                        width={30}
						buttonColour={this.state.liked ? "#6236FF" : "#00000000"}
						buttonHoverColour={this.state.liked ? "#6236FF" : "#00000000"}
						src={this.props.icon}
						onAction={this.genreLiked}
                    />
                </div>
                    <TextButton
						buttonColour={"#00000000"}
						buttonHoverColour={"#00000000"}
						text={this.props.text}
						onAction={this.props.onTextAction}
                    />
            </div>
        );
    }
}

export interface ISidebarTextImageButtonProps extends IButtonProps, ITextButtonProps {
    text: string;
    icon: string;
    onTextAction?: (callback: () => void) => void;
}

export interface ISidebarTextImageButtonState extends IButtonState {
	liked: boolean;
}

export {SidebarTextImageButton};
