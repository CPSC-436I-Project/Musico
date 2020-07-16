import * as React from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {Image} from "./Image";
import {TextButton} from "./buttons/TextButton";
import {ImageButton} from "./buttons/ImageButton";
import {MusicPlayerQueue} from "./MusicPlayerQueue";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg";
import {hideMusicSidebar} from "../redux/actions/musicSidebarActions";
import closeIcon from "../icons/close.png";

class MusicSidebar extends EnhancedComponent<IMusicSidebarProps, IMusicSidebarState> {
    public static defaultProps: IMusicSidebarProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IMusicSidebarProps) => IMusicSidebarProps = (state: IStore, props: IMusicSidebarProps) => {
        return {
            ...props,
            musicSidebarOpen: state.musicSidebarStore.musicSidebarOpen,
        };
    }

    protected constructor(props: IMusicSidebarProps) {
        super(props);
        this.state = {
            musicSidebarOpen: true
        };
    }

    closeMusicSidebar = () => {
		this.props.dispatch(hideMusicSidebar());
	}

    public render() {
        return (  
            <div className="music-sidebar">
                <span className="close-button">
						<ImageButton src={closeIcon} onAction={this.closeMusicSidebar} height={20} width={20} buttonColour="grey"/>
				</span>
                <div className="currently-playing">
                    <Image
                        path={thumbnailPlaceholder}
                        name={"Album"}
                        width={204}
                        height={115}
                    />
                    <p>Video title or song name from YouTube - Artist</p>
                </div>
                <div className="music-player-queue">
                    <MusicPlayerQueue />
                </div>
                <div className="add-music-button">
                    <TextButton
                        text={"+ Add Music"}
                        bold={true}
                        buttonColour="#6236FF"
					    height={44}
                        width={204}
                        fontSize={20}
				    />
                </div>
            </div>
        )
    }
}

export interface IMusicSidebarProps extends IEnhancedComponentProps {
    width?: number,
    height?: number,
    dispatch?: any,
    musicSidebarOpen?: boolean,
}

export interface IMusicSidebarState extends IEnhancedComponentState {
    musicSidebarOpen: boolean
}

// @ts-ignore
export default connect(MusicSidebar.mapStateToProps)(MusicSidebar);