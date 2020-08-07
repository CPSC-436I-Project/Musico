import * as React from "react";
import {ReactNode} from "react";
import "./css/Header.css";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {ImageButton} from "./buttons/ImageButton";
import profilePlaceholder from "../icons/profile-placeholder.png";
import menuIcon from "../icons/menu.png";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {unselectGenre} from "src/redux/actions/roomActions";
import {RoundImageButton} from "./index";

class Header extends EnhancedComponent<IHeaderProps, IHeaderState> {

    public static defaultProps: IHeaderProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps: (state: IStore, props: IHeaderProps) => IHeaderProps = (state: IStore, props: IHeaderProps) => {
        return {
            ...props,
            sidebarOpen: state.sidebarStore.sidebarOpen,
            profileImgSrc: state.userStore.profileImgSrc,
        };
    };

    protected constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            ...this.state,
        };
    }

    /**
     * set the currently selected genre to null
     */
    resetGenre = () => {
        this.props.dispatch(unselectGenre());
    };

    public render(): ReactNode {
        return (
            <div className="header">
                <div className="header-left">
                    <div className="hamburger">
                        <ImageButton src={menuIcon} width={30} height={30} buttonColour="transparent"
                                     onAction={this.props.onMenuClick}/>
                    </div>
                    <div className="logo-container logo-icon">
                        <ImageButton
                            src={"/textlogo.png"}
                            height={40}
                            onAction={this.props.onLogoClick}
                            buttonColour={"transparent"}
                            buttonFocusedColour={"transparent"}
                            buttonHoverColour={"transparent"}
                        />
                    </div>
                </div>
                <div className="header-right">
                    <RoundImageButton
                        src={this.props.profileImgSrc || profilePlaceholder}
                        width={40}
                        height={40}
                        onAction={this.props.onProfileClick}
                    />
                </div>
            </div>
        );
    }
}

export interface IHeaderProps extends IEnhancedComponentProps {
    profileImgSrc?: string,
    sidebarOpen?: boolean,
    onProfileClick?: (callback: () => void) => void;
    onMenuClick?: (callback: () => void) => void;
    onLogoClick?: (callback: () => void) => void;
}

export interface IHeaderState extends IEnhancedComponentState {
}

// @ts-ignore
export default connect(Header.mapStateToProps)(Header);
