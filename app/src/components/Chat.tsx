import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {TextButton} from "./buttons/TextButton";
import { TextInput } from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import { GenreEnum } from ".";
import io from "socket.io-client";
import { API_URL } from "src/utility/constants";
import { getCookie } from "src/utility/cookies";
import { GenericScreen } from "src/containers/TestScreens/GenericScreen";
import PopupTest from "src/containers/TestScreens/PopupTest";
import { getMessages } from "src/redux/actions/chatRoomActions";
import { store } from "src";

const SOCKET_IO_URL = "http://localhost:9000";
const socket = io(SOCKET_IO_URL); 

socket.on("newMessage", (data: any) => {
    console.log("this runs");
    console.log(data);
    store.dispatch(getMessages());
});

class Chat extends EnhancedComponent<IChatProps, IChatState> {

    public static defaultProps: IChatProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
            getMessages: state.chatRoomStore.getMessages,
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
        console.log("updating messages");
        if (this.props.getMessages !== previousProps.getMessages) {
            this.getChatRoomMessages();
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
            let messages: any = [];
            try {
                messages = JSON.parse(res);
            } catch {
                console.log("Getting chat failed!");
                messages = [{_id: "none", message: "Access Denied, try logging in first", user: "(No User)"}];
            }
            this.setState({messages: messages});
            this.setInitialized(true);
        });
    }

    updateCurrMessage = (text: string) => {
        this.setState({currentMessage: text});
    };

    public render(): ReactNode {
        const items = this.state.messages.map(function(item){
            return <li key={item._id}> {item.user} says: {item.message} </li>;
        });
        const dash = () => {
            if (this.props.selectedGenre === null) {
                return <GenericScreen/>
            } else {
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
                        <PopupTest/>
                    </div>
                );
            }
        }
        
        return dash();
    }
}

export interface IChatProps extends IEnhancedComponentProps {
    selectedGenre?: GenreEnum | null;
    getMessages?: boolean;
    userId?: string | null;
}

export interface IChatState extends IEnhancedComponentState {
    messages: any[],
    currentMessage: string,
    isInitialized: boolean
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);