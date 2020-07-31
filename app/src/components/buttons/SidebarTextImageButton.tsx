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
        // this.state = {};
    }

    public render(): ReactNode {
        return (
            <div className="sidebar-text-image-button">
                <div>
                    <ImageButton
                        width={30}
						buttonColour={"#00000000"}
						buttonHoverColour={"#00000000"}
						src={this.props.icon}
                        // alt={this.props.text.concat(" icon")}
                        // className="sidebar-text-image-button-icon"
                    />
                </div>
                {/*<div>*/}
                    <TextButton
                        // width={140}
						buttonColour={"#00000000"}
						buttonHoverColour={"#00000000"}
						text={this.props.text}
                    />
                {/*</div>*/}
            </div>
        );
    }
}

export interface ISidebarTextImageButtonProps extends IButtonProps, ITextButtonProps {
    text: string;
    icon: string;
}

export interface ISidebarTextImageButtonState extends IButtonState {

}

export {SidebarTextImageButton};
