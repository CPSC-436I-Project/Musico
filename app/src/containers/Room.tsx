import * as React from "react";
import {ReactNode} from "react";
import "../components/css/Room.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import Chat from "src/components/Chat";
import {AddSongForm, MusicSidebar} from "src/components";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {downloadMessages, getChannelQueue, updateCurrentlyPlaying} from "src/redux/actions/roomActions";
import {API_URL} from "src/utility/constants";
import io from "socket.io-client";
import {getCookie} from "src/utility/cookies";

const socket = io(API_URL);

class Room extends Container<IRoomProps, IRoomState> {

    public static mapStateToProps: (state: IStore, props: IRoomProps) => IRoomProps = (state: IStore, props: IRoomProps) => {
        return {
            ...props,
            ...Container.mapStateToProps(state, props),
            userId: state.userStore.userId,
            username: state.userStore.username,
        };
    };

    private sideBarRef: any;

    protected constructor(props: IContainerProps) {
        super(props);
        this.state = {
            ...this.state,
            isInitialized: false
        };
        this.popupRender = this.popupRender.bind(this);
    }

    // -----------------------------
    // CHAT
    // -----------------------------

    gotMessagesCallback = () => {
        this.setInitialized(true);
    };

    setInitialized = (s: boolean) => {
        this.setState({isInitialized: s});
    };

    sendMessage = (messageData) => {
        socket.emit("message", messageData, () => {
            this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
        });
    };

    // -----------------------------
    // QUEUE
    // -----------------------------

    addSongCompletion = () => {
        socket.emit("addToQueue", {token: getCookie('auth-token'), userId: this.props.userId}, () => {
            this.props.dispatch(getChannelQueue(this.props.selectedGenre));
        });
    };

    voteCompletion = () => {
        socket.emit("updateVote", {token: getCookie('auth-token'), userId: this.props.userId}, () => {
            this.props.dispatch(getChannelQueue(this.props.selectedGenre));
        });
    };

    // -----------------------------
    // ADD SONG POPUP
    // -----------------------------

    protected popupRender() {
        return (
            <AddSongForm
                addSong={this.addSongCompletion}
            />
        );
    };

    // -----------------------------
    // Component
    // -----------------------------

    componentDidMount = () => {
        if (!this.state.isInitialized) {
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, (data: any) => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback));
                this.props.dispatch(getChannelQueue(this.props.selectedGenre));
                this.props.dispatch(updateCurrentlyPlaying(data.song, data.startTime));
            });
            socket.on("newMessage", (data: any) => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback));
            });
            socket.on("updateQueue", (data: any) => {
                this.props.dispatch(getChannelQueue(this.props.selectedGenre));
            });
            socket.on("updateQueueAndPlay", (data: any) => {
                if (data.song.genre === this.props.selectedGenre) {
                    this.props.dispatch(getChannelQueue(this.props.selectedGenre));
                    this.props.dispatch(updateCurrentlyPlaying(data.song, data.startTime));
                }
            });
        }
    };

    componentDidUpdate = (previousProps: any) => {
        if (this.props.selectedGenre !== previousProps.selectedGenre) {
            socket.emit('disconnect');
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, (data: any) => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback));
                this.props.dispatch(getChannelQueue(this.props.selectedGenre));
                this.props.dispatch(updateCurrentlyPlaying(data.song, data.startTime));
            });
        }
    };

    public render(): ReactNode {
        return (
            <div className="room">
                <div className="chat">
                    <Chat sendMessage={this.sendMessage}/>
                </div>
                <div className="music-sidebar">
                    <MusicSidebar
                        showPopup={this.openPopup}
                        childRef={(ref: any) => {
                            this.sideBarRef = ref;
                        }}
                        voteCompletionHandler={this.voteCompletion}
                    />
                </div>
            </div>
        );
    }
}

export interface IRoomProps extends IContainerProps {
    userId?: string | null;
    username?: string;
}

export interface IRoomState extends IContainerState {
    isInitialized: boolean
}

// @ts-ignore
export default connect(Room.mapStateToProps)(Room);
