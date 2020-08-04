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
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";

class ChatMessage extends EnhancedComponent<IChatMessageProps, IChatMessageState> {
	public static defaultProps: IChatMessageProps = {
		...EnhancedComponent.defaultProps,
	};

	public static mapStateToProps:(state: IStore, props: IChatMessageProps) => IChatMessageProps = (state: IStore, props: IChatMessageProps) => {
		return {
			...props,
			userId: state.userStore.userId,
			profileImgSrc: state.userStore.profileImgSrc,
		};
	}

	private readonly divRef: any;
	protected constructor(props: IChatMessageProps) {
		super(props);
		this.state = {
			...this.state,
			id: this.props.message.user,
			name: this.props.message.username,
			message: this.props.message.message,
			isCurrentUser: this.props.userId === this.props.message.user,
			divRect: {
				height: 0, left: 0, bottom: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON(): any {}
			},
			// @ts-ignore
			time: moment(new Date(this.props.message.time)).calendar(),
		};

		this.divRef = React.createRef();
	}

	/**
	 * set the avatar URL.
	 * If the message sender is not the current user then send GET request to server for avatar URL
	 */
	public componentDidMount() {
		if (this.state.isCurrentUser) {
			this.setState({avatarURL: this.props.profileImgSrc});
		} else {
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

		if (this.divRef.current && this.divRef.current.getBoundingClientRect) {
			this.setState({divRect: this.divRef.current.getBoundingClientRect()});
		}
	}

	public render(): ReactNode {
		const avatarBlock: any = <div className={"chat-message-user-info"}>
			<Image
				path={this.state.avatarURL}
				width={40}
				height={40}
				rounded={true}
				backgroundColour={"white"}
				className={"chat-message-avatar"}
			/>
			<div
				className={"chat-message-user-info-detailed"}
				style={{
					left: this.state.divRect.left,
					right: this.state.divRect.right,
					top: this.state.divRect.top,
					bottom: this.state.divRect.bottom,
				}}
			>
				<Image
					path={this.state.avatarURL}
					width={70}
					height={70}
					rounded={true}
					backgroundColour={"white"}
					className={"chat-message-avatar"}
				/>
				<p>{this.state.name}</p>
			</div>
		</div>;

		return (
			<div
				ref={this.divRef}
				className={"chat-message-container"}
				style={{justifyContent: this.state.isCurrentUser ? "flex-end" : "flex-start"}}
			>
				{!this.state.isCurrentUser && avatarBlock}
				<div className={"chat-message-block"} style={{alignItems: "flex-start"}}>
					<p
						className={"chat-message-username"}
						style={{justifyContent: this.state.isCurrentUser ? "flex-end" : "flex-start"}}
					>
						{this.state.name}
					</p>
					<div
						className={"chat-message-bubble"}
						style={{
							backgroundColor: this.state.isCurrentUser ? "#009AFF" : "#eee",
							color: this.state.isCurrentUser? "#eee" : "#222",
						}}
					>
						<p id={"chat-message-content"}>{this.state.message}</p>
						<p id={"chat-message-time"}>{this.state.time}</p>
					</div>
				</div>
				{this.state.isCurrentUser && avatarBlock}
			</div>
		);
	}
}

export interface IChatMessageProps extends IEnhancedComponentProps {
	message?: IMessageInterface;
	userId?: string;
	profileImgSrc?: string;
}

export interface IChatMessageState extends IEnhancedComponentState {
	time: string;
	id: string;
	name: string;
	message: string;
	avatarURL: string;
	isCurrentUser: boolean; // true if the sender is the current user
	divRect: DOMRect;
}

// @ts-ignore
export default connect(ChatMessage.mapStateToProps)(ChatMessage);
