import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {GenreEnum, Image, TextButton} from "./";
import {IMessageInterface} from "../utility/messages";
import * as moment from "moment";
import "./css/ChatMessage.css";
import "./css/Components.css";
import {API_URL} from "../utility/constants";
import {getCookie} from "../utility/cookies";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {setSelectedGenre} from "../redux/actions";

class ChatMessage extends EnhancedComponent<IChatMessageProps, IChatMessageState> {
	public static defaultProps: IChatMessageProps = {
		...EnhancedComponent.defaultProps,
	};

	public static mapStateToProps:(state: IStore, props: IChatMessageProps) => IChatMessageProps = (state: IStore, props: IChatMessageProps) => {
		return {
			...props,
			selectedGenre: state.roomStore.selectedGenre,
			userId: state.userStore.userId,
			profileImgSrc: state.userStore.profileImgSrc,
			favGenres: state.userStore.favouriteGenres,
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
			favouriteGenres: [],
			divRect: {
				height: 0, left: 0, bottom: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON(): any {}
			},
			// @ts-ignore
			time: moment(new Date(this.props.message.time)).calendar(),
		};

		this.divRef = React.createRef();
		this.switchRoom = this.switchRoom.bind(this);
		this.createFavGenreButtons = this.createFavGenreButtons.bind(this);
		this.updateRect = this.updateRect.bind(this);
	}

	private switchRoom(genre: GenreEnum): (callback: () => void) => void {
		return (callback: () => void) => {
			if (genre !== this.props.selectedGenre) {
				this.props.dispatch(setSelectedGenre(genre));
			}
			callback();
		}
	}

	private createFavGenreButtons(genre: GenreEnum): ReactNode {
		return(
			<TextButton
				text={genre}
				key={genre}
				onAction={this.switchRoom(genre)}
				height={12}
				width={genre.length * 9}
				fontSize={10}
				buttonColour={"#6236FF"}
			/>
		)
	}

	/**
	 * set the avatar URL.
	 * If the message sender is not the current user then send GET request to server for avatar URL
	 */
	public componentDidMount() {
		this.props.childRef(this);
		if (this.state.isCurrentUser) {
			this.setState({avatarURL: this.props.profileImgSrc, favouriteGenres: this.props.favGenres});
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
					console.log("Error in fetching user info");
				} else {
					this.setState({
						avatarURL: res.json.profilePicture,
						favouriteGenres: res.json.favouriteGenres || [],
					});
				}
			}).catch((err) => {
				console.log(err);
			})
		}

		this.updateRect();
	}

	public componentWillUnmount() {
		this.props.childRef(undefined);
	}

	public updateRect(): void {
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
					left: this.state.isCurrentUser ? this.state.divRect.right : this.state.divRect.left + 60,
					top: this.state.divRect.top - 40,
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
				<h4 style={{marginTop: 5, marginBottom: 5}}>{this.state.name}</h4>
				<p style={{fontSize: 12, marginBottom: 5}}>
					{this.state.favouriteGenres.length > 0 ? "Favourite Genres:" : "This user has no favourite genres"}
				</p>
				{this.state.favouriteGenres.map(this.createFavGenreButtons)}
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
	favGenres?: GenreEnum[];
	selectedGenre?: GenreEnum;
	childRef?: (ref: ChatMessage) => void;
}

export interface IChatMessageState extends IEnhancedComponentState {
	time: string;
	id: string;
	name: string;
	message: string;
	avatarURL: string;
	favouriteGenres: GenreEnum[];
	isCurrentUser: boolean; // true if the sender is the current user
	divRect: DOMRect;
}

// @ts-ignore
export default connect(ChatMessage.mapStateToProps)(ChatMessage);
