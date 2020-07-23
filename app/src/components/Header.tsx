import * as React from "react";
import {ReactNode} from "react";
import "./css/Header.css";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import {ImageButton} from "./buttons/ImageButton";
import profilePlaceholder from "../icons/profile-placeholder.png";
import menuIcon from "../icons/menu.png";
import musicNoteIcon from "../icons/musicNote.png";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";

class Header extends EnhancedComponent<IHeaderProps, IHeaderState> {

    public static defaultProps: IHeaderProps = {
        ...EnhancedComponent.defaultProps,
    }

    public static mapStateToProps:(state: IStore, props: IHeaderProps) => IHeaderProps = (state: IStore, props: IHeaderProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc,
        };
    }


    protected constructor(props: IHeaderProps) {
        super(props);
        this.state = {
        };
    }

    public render(): ReactNode {
        return (
            <div className="header">
                <ImageButton src={menuIcon} width={40} height={40} buttonColour="transparent" onAction={this.props.onMenuClick}/>
                <div className="logo-icon">
                    <Image width={40} height={40} path={musicNoteIcon} />
                </div>
                <span className="logo">Musico</span>
                <div className="header-right">
                    <ImageButton src={this.props.profileImgSrc || profilePlaceholder} width={40} height={40} buttonColour="white" onAction={this.props.onProfileClick}/>
                </div>
            </div>
        );
    }
}

export interface IHeaderProps extends IEnhancedComponentProps {
    profileImgSrc?: string,
    onProfileClick?: (callback: () => void) => void;
    onMenuClick?: (callback: () => void) => void;
}

export interface IHeaderState extends IEnhancedComponentState {
}

// @ts-ignore
export default connect(Header.mapStateToProps)(Header);
