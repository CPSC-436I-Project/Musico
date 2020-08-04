import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./";
import {IMessageInterface} from "../utility/messages";
import * as moment from "moment";
import "./css/ChatMessage.css";
import "./css/Components.css";
import {API_URL} from "../utility/constants";
import {getCookie} from "../utility/cookies";

class ChatMessage extends EnhancedComponent<IChatMessageProps, IChatMessageState> {
	public static defaultProps: IChatMessageProps = {
		...EnhancedComponent.defaultProps,
	};

	protected constructor(props: IChatMessageProps) {
		super(props);
		this.state = {
			...this.state,
			id: this.props.message.user,
			name: this.props.message.username,
			message: this.props.message.message,
			// @ts-ignore
			time: moment(new Date(this.props.message.time)).calendar(),
		};
	}

	/**
	 * send GET request to server for avatar URL
	 */
	public componentDidMount() {
		const token = getCookie('auth-token');
		fetch(`${API_URL}userprofiles/username/${this.state.id}`, {
			method: 'GET',
			headers: {
				'auth-token': token,
			}
		}).then(async res => {
				return {json: await res.json(), status: res.status}
		}).then((res) => {
			if (res.status !== 200) {
				console.log("Error in fetching avatar info");
			} else {
				this.setState({avatarURL: res.json.profilePicture});
			}
		}).catch((err) => {
			console.log(err);
		})
	}

	public render(): ReactNode {
		return (
			<div className={"chat-message-container"}>
				<Image path={this.state.avatarURL}/>
			</div>
		);
	}
}

export interface IChatMessageProps extends IEnhancedComponentProps {
	message?: IMessageInterface;
}

export interface IChatMessageState extends IEnhancedComponentState {
	time: string;
	id: string;
	name: string;
	message: string;
	avatarURL: string;
}

export {ChatMessage};
