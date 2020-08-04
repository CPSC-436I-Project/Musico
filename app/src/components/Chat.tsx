import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {GenreEnum} from ".";
import io from "socket.io-client";
import {IMessageInterface} from "src/utility/messages";
import {downloadMessages} from "src/redux/actions/chatRoomActions";
import {getCookie} from "src/utility/cookies";
import "./css/Chat.css";
import {API_URL} from "../utility/constants";
import ChatMessage from "./ChatMessage";

const socket = io(API_URL);
var Filter = require('bad-words');

class Chat extends EnhancedComponent<IChatProps, IChatState> {

	messagesEndRef: any = React.createRef()

	public static defaultProps: IChatProps = {
		...EnhancedComponent.defaultProps,
	};

	public static mapStateToProps: (state: IStore, props: IChatProps) => IChatProps = (state: IStore, props: IChatProps) => {
		return {
			...props,
			selectedGenre: state.chatRoomStore.selectedGenre,
			messages: state.chatRoomStore.messages,
			userId: state.userStore.userId,
			username: state.userStore.username,
		};
	}

	private textInputRef: TextInput;

	private constructor(props: IChatProps) {
		super(props);
		this.state = {
			currentMessage: "",
			isInitialized: false
		};

		this.saveTextInputRef = this.saveTextInputRef.bind(this);
	}

	setInitialized = (s: boolean) => {
		this.setState({isInitialized: s});
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
		socket.emit("message", data, () => {
			this.props.dispatch(downloadMessages(this.props.selectedGenre, this.gotMessagesCallback))
		});
		this.textInputRef.resetText();
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
		// this.messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
	}

	private saveTextInputRef(ref: TextInput): void {
		this.textInputRef = ref;
	}

	private static renderMessageObject(item: IMessageInterface): ReactNode {
		return (
			<ChatMessage
				message={item}
				key={item._id}
			/>
		)
	}

	public render(): ReactNode {
		return (
			<div className="chat">
				<div className="scrollable-container">
					<div className={"chat-hidden-component"}/>
					{this.props.messages.reverse().map(Chat.renderMessageObject)}
				</div>
				<div className="chat-input">
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
}

export interface IChatState extends IEnhancedComponentState {
	currentMessage: string,
	isInitialized: boolean
}

// @ts-ignore
export default connect(Chat.mapStateToProps)(Chat);
