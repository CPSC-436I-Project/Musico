import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {TextButton} from "./buttons/TextButton";
import { TextInput } from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import { GenreEnum } from ".";
import io from "socket.io-client";
import { API_URL } from "src/utility/constants";
import { getCookie } from "src/utility/cookies";

const SOCKET_IO_URL = "http://localhost:9000";
const socket = io(SOCKET_IO_URL);

// const getChatData = () => {
//     return JSON.parse(localStorage.getItem("chatData"));
// };

// export const getChatRooms = () => axios.get(`${API_URL}/chatroom/chatrooms`);

// export const getChatRoomMessages = (chatRoomName: string) =>
//   axios.get(`${API_URL}/chat/chatroom/messages/${chatRoomName}`);

// export const joinRoom = (room: any) =>
//   axios.post(`${API_URL}/chat/chatroom`, { room });

class Chat extends EnhancedComponent<IChatProps, IChatState> {

    public static defaultProps: IChatProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
            userId: state.userStore.userId,
        };
    }

    private constructor(props: IChatProps) {
        super(props);
        this.state = {
            messages: [],
            currentMessage: "",
            isInitialized: false
        };
    }

    setInitialized = (s: boolean) => {
        this.setState({isInitialized: s});
    }

    handleSubmit = (callback: () => void) => {
        let data = {
            userId: this.props.userId,
            message: this.state.currentMessage
        };
        socket.emit("message", data, this.getChatRoomMessages);
        callback();
    };

    componentDidMount = () => {
        if (!this.state.isInitialized) {
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, () => {
                this.getChatRoomMessages();
            });
            console.log(socket);
        }
    }

    componentDidUpdate = (previousProps: any) => {
        if (this.props.selectedGenre !== previousProps.selectedGenre) {
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, () => {
                this.getChatRoomMessages();
            });
            console.log(socket);
        }
    }

    // callback for loading chat messages from the server when user joins
    getChatRoomMessages = () => {
        console.log("Getting chat");
        let token = getCookie('auth-token');
        fetch(API_URL+"chats/"+this.props.selectedGenre, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
        .then(res => res.text())
        .then(res => {
            let messages = JSON.parse(res);
            this.setState({messages: messages});
            this.setInitialized(true);
        });
    }

    updateCurrMessage = (text: string) => {
        this.setState({currentMessage: text});
    };

    messageSender = (text: string) => {
        return () => {
            //this.props.dispatch(addSong(this.props.selectedGenre));
        }
    };

    public render(): ReactNode {
        const items = this.state.messages.map(function(item){
            return <li key={item._id}> {item.message} </li>;
          });
        return (
            <div className="chat">
                <ul>
                {items}
                </ul>
                <TextInput defaultText="Enter a message" submit={this.updateCurrMessage} />
                <TextButton text={"Send"}
                            fontSize={14} width={100}
                            fontColour={"#ffffff"}
                            buttonColour={"#000000"}
                            buttonHoverColour={"#000000"}
                            height={20}
                            onAction = {this.handleSubmit}
                />
            </div>
        );
    }
}

export interface IChatProps extends IEnhancedComponentProps {
    selectedGenre?: GenreEnum | null;
    userId?: string | null;
}

export interface IChatState extends IEnhancedComponentState {
    messages: any[],
    currentMessage: string,
    isInitialized: boolean
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);