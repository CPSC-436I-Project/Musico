import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {GenreEnum} from ".";
import {MusicPlayerQueue} from "./MusicPlayerQueue";
import {TextButton} from "./buttons/TextButton";
import "./css/MusicSidebar.css";
import {CurrentlyPlaying} from "./CurrentlyPlaying";
import {ISongInterface} from "src/utility/songs";

class MusicSidebar extends EnhancedComponent<IMusicSidebarProps, IMusicSidebarState> {

    public static defaultProps: IMusicSidebarProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps: (state: IStore, props: IMusicSidebarProps) => IMusicSidebarProps = (state: IStore, props: IMusicSidebarProps) => {
        return {
            ...props,
            musicSidebarOpen: state.musicSidebarStore.musicSidebarOpen,
            selectedGenre: state.musicSidebarStore.selectedGenre,
            queue: state.roomStore.queue,
            currentlyPlaying: state.roomStore.currentlyPlaying,
            startTime: state.roomStore.startTime
        };
    };

    protected constructor(props: IMusicSidebarProps) {
        super(props);
        this.state = {
            musicSidebarOpen: true,
        };
        this.showPopup = this.showPopup.bind(this);
    }

    componentDidMount = () => {
        this.props.childRef(this);
    };


    componentWillUnmount() {
        this.props.childRef(undefined);
    }


    private showPopup(callback: () => void): void {
        this.props.showPopup();
        callback();
    }

    public render(): ReactNode {
        return (
            <div className="music-sidebar">
                <div className="currently-playing">
                    <CurrentlyPlaying song={this.props.currentlyPlaying} startTime={this.props.startTime}/>
                </div>
                <div className="music-player-queue scrollable-container">
                    <MusicPlayerQueue queue={this.props.queue}
                                      voteCompletionHandler={this.props.voteCompletionHandler}/>
                    <div className={"music-player-queue-hidden-component"}/>
                </div>
                <div className="add-music-button">
                    <TextButton
                        text={"+ Add Music"}
                        bold={true}
                        buttonColour="#6236FF"
                        height={44}
                        width={204}
                        fontSize={20}
                        onAction={this.showPopup}
                    />
                </div>
            </div>
        )
    }
}

export interface IMusicSidebarProps extends IEnhancedComponentProps {
    width?: number;
    height?: number;
    dispatch?: any;
    musicSidebarOpen?: boolean;
    selectedGenre?: GenreEnum | null;
    queue?: ISongInterface[];
    currentlyPlaying?: ISongInterface;
    showPopup?: () => void;
    childRef?: (ref: MusicSidebar) => void;
    voteCompletionHandler?: (resp: any) => void;
    startTime?: string;
}

export interface IMusicSidebarState extends IEnhancedComponentState {
    musicSidebarOpen: boolean
}

// @ts-ignore
export default connect(MusicSidebar.mapStateToProps)(MusicSidebar);
