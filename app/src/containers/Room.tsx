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
import {addLikedSong, removeLikedSong} from "src/redux/actions/userActions";

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

    /**
     * Sets the initialized state to True when messages are recieved
     */
    gotMessagesCallback = () => {
        this.setInitialized(true);
    };

    /**
     * Helper to set the initialized state
     */
    setInitialized = (s: boolean) => {
        this.setState({isInitialized: s});
    };

    /**
     * Submit chat message to the server using socket
     * 
     * @param messageData - message contents
     */
    sendMessage = (messageData) => {
        socket.emit("message", messageData, () => {
            this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
        });
    };

    // -----------------------------
    // QUEUE
    // -----------------------------

    /**
     * Sends socket update to notify the server that the queue has changed
     */
    addSongCompletion = () => {
        socket.emit("addToQueue", {token: getCookie('auth-token'), userId: this.props.userId});
    };

    /**
     * Completion handler to update redux store and emit socket 
     * message to server to sync votes
     * 
     * @param resp - vote info, including song id
     */
    voteCompletion = (resp: any) => {
        if (resp.update === true) {
            if (resp.type === "up") {
                this.props.dispatch(addLikedSong(resp.id));
            } else {
                this.props.dispatch(removeLikedSong(resp.id));
            }
        }
        socket.emit("updateVote", {token: getCookie('auth-token'), userId: this.props.userId});
    };

    // -----------------------------
    // ADD SONG POPUP
    // -----------------------------

    /**
     * Renders the Add Song popup
     */
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

    /**
     * Called on component mount. Handles new socket connections
     * when Room is initialized
     */
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
                if (data.song && data.song.genre === this.props.selectedGenre) {
                    this.props.dispatch(getChannelQueue(this.props.selectedGenre));
                    this.props.dispatch(updateCurrentlyPlaying(data.song, data.startTime));
                }
            });
        }
    };

    /**
     * Called when component is updated, such as, when the genre room changes.
     * Disconnects the existing socket connection and joins the new genre room.
     * 
     * @param previousProps 
     */
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

    /**
     * Called when component is unmounted. Unsubscribes socket connections
     * and disconnects it from the current genre room.
     */
    componentWillUnmount = () => {
        socket.off("newMessage");
        socket.off("updateQueue");
        socket.off("updateQueueAndPlay");
        socket.emit('disconnect');
    }

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
