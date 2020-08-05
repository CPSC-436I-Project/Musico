import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Components.css";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import { GenreEnum } from ".";
import { IMessageInterface } from "src/utility/messages";
import { getCookie } from "src/utility/cookies";
import "./css/Chat.css";
import {API_URL} from "../utility/constants";
import ChatMessage from "./ChatMessage";

var Filter = require('bad-words');

class Chat extends EnhancedComponent<IChatProps, IChatState> {

	messagesEndRef: any = React.createRef()

	public static defaultProps: IChatProps = {
		...EnhancedComponent.defaultProps,
		sendMessage: (data) => {}
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
	}

	private textInputRef: TextInput;

	private constructor(props: IChatProps) {
		super(props);
		this.state = {
			currentMessage: "",
		};

		this.saveTextInputRef = this.saveTextInputRef.bind(this);
	}

	handleSubmit = (callback: () => void) => {
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

	updateCurrMessage = (text: string) => {
		this.setState({currentMessage: text});
	};

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
					{[...this.props.messages].reverse().map(Chat.renderMessageObject)}
				</div>
				<div className="chat-input" style={{width: `calc(100% - ${this.props.sidebarOpen ? 460 : 250}px)`}}>
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
