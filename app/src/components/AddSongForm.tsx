import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {decodeHTML, GenreEnum, genreIDMap, Image, youtubeQuery} from "./index";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {ISongListObject} from "../utility/songs";
import "./css/AddSongForm.css";
import {API_URL} from "../utility/constants";
import {getCookie} from "../utility/cookies";

class AddSongForm extends EnhancedComponent<IAddSongFormProps, IAddSongFormState> {

	public static defaultProps: IAddSongFormProps = {
		...EnhancedComponent.defaultProps,
	};

	public static mapStateToProps: (state: IStore, props: IAddSongFormProps) => IAddSongFormProps = (state: IStore, props: IAddSongFormProps) => {
		return {
			...props,
			selectedGenre: state.chatRoomStore.selectedGenre,
			username: state.userStore.username,
			songList: state.songListStore.songs
		};
	}

	private static NUM_SEARCH_RESULTS = 5;

	protected constructor(props: IAddSongFormProps) {
		super(props);
		this.state = {
			...this.state,
			songTitle: "",
			videoList: [],
		};

		this.updateSongLink = this.updateSongLink.bind(this);
		this.addSongSender = this.addSongSender.bind(this);
		this.renderVideoObject = this.renderVideoObject.bind(this);
		this.addSongToQueue = this.addSongToQueue.bind(this);
	}

	private updateSongLink(text: string) {
		this.setState({songTitle: text.trim()});
	};

	private addSongSender(callback: () => void) {
		let videoList: any[] = [];
		youtubeQuery("search", {
			part: "snippet",
			maxResults: AddSongForm.NUM_SEARCH_RESULTS,
			q: this.state.songTitle.replace(/ /g, "%20"),
			type: "video",
			videoCategoryId: 10,
			safeSearch: "strict",
			topicId: Object.keys(genreIDMap).filter((k: string) => genreIDMap[k] === this.props.selectedGenre)[0],
			// videoDuration: "short",
		}).then((res) => {
			videoList = res.items || [];
			return youtubeQuery("videos", {
				part: "topicDetails",
				id: res.items.map((k: any) => k.id.videoId).join(","),
			});
		}).then((res) => {
			for (let i = 0; i < res.items.length; i++) {
				if (res.items[i].topicDetails && res.items[i].topicDetails.topicCategories) {
					videoList[i].genreCategories = Array.from(new Set(res.items[i].topicDetails.relevantTopicIds
						.map((k: string) => genreIDMap[k])
						.filter((k: string) => !!k)))

					if (!videoList[i].genreCategories || videoList[i].genreCategories.length === 0) {
						res.items.splice(i, 1);
						videoList.splice(i, 1);
						i -= 1;
					}
				} else {
					res.items.splice(i, 1);
					videoList.splice(i, 1);
					i -= 1;
				}
			}
			this.setState({videoList: videoList}, callback);
		}).catch((err) => {
			console.error(err);
		});
	}

	private renderVideoObject(video: any): ReactNode {
		return (
			<div key={video.id.videoId} className={"flex-row"}>
				<Image
					path={video.snippet.thumbnails.high.url}
				/>
				<div className={"flex-column-center"} style={{width: "100%"}}>
					<a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
						<h2>{decodeHTML(video.snippet.title)}</h2></a>
					<p>{video.genreCategories ? video.genreCategories.join(", ") : ""}</p>
					<TextButton
						text={"Add to Queue"}
						onAction={this.addSongToQueue(video)}
					/>
				</div>
			</div>
		);
	}

	private static getDurationFromRegex(text: string, timeType: "H" | "M" | "S"): number {
		const regex: RegExp = RegExp("[0-9]+?" + timeType, "g");
		const test: RegExpExecArray | null = regex.exec(text);
		if (test) {
			return parseInt(test[0]);
		}
		return 0;
	}

	private addSongToQueue(video: any): (callback: () => void) => void {
		return (callback: () => void) => {
			const token = getCookie('auth-token');
			youtubeQuery("videos", {
				part: "contentDetails",
				id: video.id.videoId,
			}).then((res) => {
				const times: string = res.items[0].contentDetails.duration; // PT{hrs}H{mins}M{secs}S
				const duration: number = AddSongForm.getDurationFromRegex(times, "H") * 3600 +
					AddSongForm.getDurationFromRegex(times, "M") * 60 +
					AddSongForm.getDurationFromRegex(times, "S");

				return fetch(API_URL + "songs/add", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'auth-token': token,
					},
					body: JSON.stringify({
						artists: [],
						albumCover: video.snippet.thumbnails.default.url,
						numVotes: 1,
						songName: video.snippet.title,
						genre: this.props.selectedGenre,
						src: `https://www.youtube.com/watch?v=${video.id.videoId}`,
						// TODO: @Breanne: uncomment the following line and make sure duration field is pushed to mongo
						// duration: duration,
					}),
				});
			}).then(async res => {
					return {text: await res.text(), status: res.status}
				})
				.then((res) => {
					if (res.status !== 200) {
						console.log(res);
					} else {
						const newSong = JSON.parse(res.text);
						this.props.addSong(newSong);
					}
					callback();
				});
		}
	}

	public render(): ReactNode {
		return (
			<div className="add-song-form">
				<h3>Search a song</h3>
				<TextInput
					defaultText="Enter a song title here"
					submit={this.updateSongLink}
				/>
				<TextButton
					text="Submit" bold={true}
					buttonColour="#6236FF"
					height={30}
					width={90}
					onAction={this.addSongSender}
				/>
				<div className={"scrollable-container"} style={{maxHeight: "55vh"}}>
					{this.state.videoList.map(this.renderVideoObject)}
				</div>
			</div>
		);
	}
}

export interface IAddSongFormProps extends IEnhancedComponentProps {
	addSong?: (song: any) => void;
	selectedGenre?: GenreEnum | null;
	username?: string | null;
	songList?: ISongListObject;
}

export interface IAddSongFormState extends IEnhancedComponentState {
	songTitle: string;
	videoList: any[];
}

// @ts-ignore
export default connect(AddSongForm.mapStateToProps)(AddSongForm);

