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
import { IMessageInterface } from "src/utility/messages";
import { downloadMessages } from "src/redux/actions/chatRoomActions";
import { getCookie } from "src/utility/cookies";

const SOCKET_IO_URL = "http://localhost:9000";
const socket = io(SOCKET_IO_URL);

class Chat extends EnhancedComponent<IChatProps, IChatState> {

    messagesEndRef: any = React.createRef()

    public static defaultProps: IChatProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
            messages: state.chatRoomStore.messages,
            userId: state.userStore.userId,
            username: state.userStore.username,
        };
    }

    private constructor(props: IChatProps) {
        super(props);
        this.state = {
            currentMessage: "",
            isInitialized: false
        };
    }

    setInitialized = (s: boolean) => {
        this.setState({isInitialized: s});
    }

    handleSubmit = (callback: () => void) => {
        let data = {
            token: getCookie('auth-token'),
            username: this.props.username,
            userId: this.props.userId,
            message: this.state.currentMessage
        };
        socket.emit("message", data, () => {
            this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
        });
        callback();
    };

    componentDidMount = () => {
        this.scrollToBottom();
        if (!this.state.isInitialized) {
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, () => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
            });
            socket.on("newMessage", (data: any) => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback));
            });
        }
    }

    componentDidUpdate = (previousProps: any) => {
        this.scrollToBottom();
        if (this.props.selectedGenre !== previousProps.selectedGenre) {
            socket.emit('disconnect');
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            }
            socket.emit('join', {genre: this.props.selectedGenre}, () => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
            });
            socket.on("newMessage", (data: any) => {
                this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback));
            });
        }
    }
    

    gotMessagesCallback = () => {
        this.setInitialized(true);
    }

    updateCurrMessage = (text: string) => {
        this.setState({currentMessage: text});
    };

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    public render(): ReactNode {
        const items = this.props.messages.map(function(item){
            let message = item.username + " says: "+item.message;
            return <span key={item._id} className="messageItem">
                <TextButton disabled={true} buttonColour={"#009AFF"} width="auto" fontColour="white" text={message}/>
            </span>;
          });
        return (
            <div className="chat">
                <div className="scrollable-container">
                {items}
                <span ref={this.messagesEndRef}/>
                </div>
                <div className="chat-input">
                    <TextInput defaultText="Enter a message"
                                submit={this.updateCurrMessage} 
                                onEnterDisabled={false} 
                                onEnterKeyDown={this.handleSubmit} 
                    />
                    <TextButton text={"Send"}
                                fontSize={14} width={"10%"}
                                fontColour={"#ffffff"}
                                buttonColour={"#000000"}
                                buttonHoverColour={"#000000"}
                                height={20}
                                onAction = {this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}

export interface IChatProps extends IEnhancedComponentProps {
    selectedGenre?: GenreEnum | null;
    messages?: IMessageInterface[];
    userId?: string | null;
    username?: string;
}

export interface IChatState extends IEnhancedComponentState {
    currentMessage: string,
    isInitialized: boolean
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);