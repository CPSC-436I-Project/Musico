import * as React from "react";
import {ReactNode} from "react";
import "./Button.css";
import "../css/Sidebar.css";
import {Button} from "./Button";
import {TextButton} from "./TextButton";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "../EnhancedComponent";
import {ImageButton} from "./ImageButton";
import {likeGenre} from "../../redux/actions/userActions";
import {connect} from "react-redux";

class SidebarTextImageButton extends EnhancedComponent<ISidebarTextImageButtonProps, ISidebarTextImageButtonState> {

    public static defaultProps: ISidebarTextImageButtonProps = {
        ...Button.defaultProps,
        text: "Electronic",
        icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png",
        fontSize: 18,
        liked: false,
    };

    protected constructor(props: ISidebarTextImageButtonProps) {
        super(props);
        this.state = {
            ...this.state,
            liked: this.props.liked
        };
        this.genreLiked = this.genreLiked.bind(this);
    }

    /**
     * Set the selected genre to be liked by the current user
     *
     * @param callback {() => void} - function to allow the button to be clickable again
     * @private
     */
    private genreLiked(callback: () => void) {
        this.props.dispatch(likeGenre(this.props.text));
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
                    additionalStyling={{alignItems: "flex-start", textAlign: "start"}}
                />
            </div>
        );
    }
}

export interface ISidebarTextImageButtonProps extends IEnhancedComponentProps {
    text: string;
    icon: string;
    fontSize?: number;
    liked: boolean;
    onTextAction?: (callback: () => void) => void;
}

export interface ISidebarTextImageButtonState extends IEnhancedComponentState {
    liked: boolean;
}

// @ts-ignore
export default connect()(SidebarTextImageButton);
