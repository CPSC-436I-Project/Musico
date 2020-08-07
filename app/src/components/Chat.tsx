import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {GenreEnum} from ".";
import {IMessageInterface} from "src/utility/messages";
import {getCookie} from "src/utility/cookies";
import "./css/Chat.css";
import ChatMessage from "./ChatMessage";

const Filter = require('bad-words');

class Chat extends EnhancedComponent<IChatProps, IChatState> {

    messagesEndRef: any = React.createRef()

    public static defaultProps: IChatProps = {
        ...EnhancedComponent.defaultProps,
        sendMessage: (data) => {
        }
    };

    public static mapStateToProps: (state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
        return {
            ...props,
            selectedGenre: state.roomStore.selectedGenre,
            messages: state.roomStore.messages,
            userId: state.userStore.userId,
            username: state.userStore.username,
            sidebarOpen: state.sidebarStore.sidebarOpen,
        };
    };

    private textInputRef: TextInput;
    private chatMessageRefs: any[] = []; // ChatMessage[]

    private constructor(props: IChatProps) {
        super(props);
        this.state = {
            currentMessage: "",
        };
        this.saveTextInputRef = this.saveTextInputRef.bind(this);
        this.renderMessageObject = this.renderMessageObject.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChatScroll = this.onChatScroll.bind(this);
    }

    /**
     * Send the input text to chat, filtering out profanity with `bad-words`
     *
     * @param callback
     * @private
     */
    private handleSubmit(callback: () => void) {
        let thisMessage = this.state.currentMessage
        let filter = new Filter();
        thisMessage = filter.clean(thisMessage)
        let data = {
            token: getCookie('auth-token'),
            username: this.props.username,
            userId: this.props.userId,
            message: thisMessage
        };
        this.props.sendMessage(data);
        this.textInputRef.resetText();
        callback();
    };

    /**
     * Update the current message in the state
     *
     * @param text {string} - text to update with
     */
    updateCurrMessage = (text: string) => {
        this.setState({currentMessage: text});
    };

    /**
     * save the reference to the text input
     *
     * @param ref {TextInput} - ref to save
     * @private
     */
    private saveTextInputRef(ref: TextInput): void {
        this.textInputRef = ref;
    }

    /**
     * Render each individual message item as a ChatMessage component
     *
     * @param item {IMessageInterface} - a chat message to render
     * @private
     * @return {ReactNode} The rendered ChatMessage
     */
    private renderMessageObject(item: IMessageInterface): ReactNode {
        return (
            <ChatMessage
                message={item}
                key={item._id}
                childRef={(ref) => {
                    this.chatMessageRefs.push(ref);
                }}
            />
        );
    }

    /**
     * Update the chat message's DivRect
     * @private
     */
    private onChatScroll(): void {
        for (const msgRef of this.chatMessageRefs.filter((k) => !!k)) {
            msgRef.updateRect();
        }
    }

    public render(): ReactNode {
        return (
            <div className="chat">
                <div className="scrollable-container" onScroll={this.onChatScroll}>
                    <div className={"chat-hidden-component"}/>
                    {[...this.props.messages].reverse().map(this.renderMessageObject)}
                </div>
                <div className="chat-input"
                     style={{width: `calc(100% - ${this.props.sidebarOpen ? 210 + 250 : 250}px)`}}>
                    <TextInput
                        defaultText="Enter a message"
                        submit={this.updateCurrMessage}
                        onEnterDisabled={false}
                        onEnterKeyDown={this.handleSubmit}
                        width={"95%"}
                        parentStyle={{
                            width: "85%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        ref={this.saveTextInputRef}
                    />
                    <TextButton
                        text={"Send"}
                        fontSize={14}
                        width={"10%"}
                        fontColour={"#ffffff"}
                        buttonColour={"#6236FF"}
                        height={35}
                        onAction={this.handleSubmit}
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
    sidebarOpen?: boolean;
    sendMessage: (data: any) => void;
}

export interface IChatState extends IEnhancedComponentState {
    currentMessage: string;
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);
