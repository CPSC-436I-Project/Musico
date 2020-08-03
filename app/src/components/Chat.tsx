import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {TextButton} from "./buttons/TextButton";
import { TextInput } from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import { GenreEnum } from ".";
import { IMessageInterface } from "src/utility/messages";
import { getCookie } from "src/utility/cookies";
import "./css/Chat.css";

var Filter = require('bad-words');

class Chat extends EnhancedComponent<IChatProps, IChatState> {

    messagesEndRef: any = React.createRef()

    public static defaultProps: IChatProps = {
        ...EnhancedComponent.defaultProps,
        sendMessage: (data) => {}
    };

    public static mapStateToProps:(state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
        return {
            ...props,
            selectedGenre: state.roomStore.selectedGenre,
            messages: state.roomStore.messages,
            userId: state.userStore.userId,
            username: state.userStore.username,
        };
    }

    private constructor(props: IChatProps) {
        super(props);
        this.state = {
            currentMessage: "",
        };
    }

    handleSubmit = (callback: () => void) => {
        let thismessage = this.state.currentMessage
        let filter = new Filter();
        thismessage = filter.clean(thismessage)
        let data = {
            token: getCookie('auth-token'),
            username: this.props.username,
            userId: this.props.userId,
            message: thismessage
        };
        this.props.sendMessage(data)
        callback();
    };

    componentDidMount = () => {
        this.scrollToBottom();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
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
                                buttonColour={"#6236FF"}
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
    sendMessage: (data: any) => void;
}

export interface IChatState extends IEnhancedComponentState {
    currentMessage: string
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);