import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {decodeHTML, GenreEnum, Image, youtubeQuery} from "./index";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {ISongListObject} from "../utility/songs";

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

	private static NUM_SEARCH_RESULTS = 15;

	protected constructor(props: IAddSongFormProps) {
		super(props);
		this.state = {
			...this.state,
			songLink: "",
			validLink: false,
			videoList: [],
		};
	}

	checkYouTubeUrl = () => {
		// let re = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m;
		// this.setState({validLink: re.test(this.state.songLink)});
		this.setState({validLink: true});
	};

	updateSongLink = (text: string) => {
		this.setState({songLink: text.trim()}, this.checkYouTubeUrl);
	};

	addSongSender = (link: string) => {
		return (callback: () => void) => {
			if (this.state.validLink) {
				// this.props.dispatch(addSong(this.props.username, link, this.props.selectedGenre));

				let videoList: any[] = [];
				youtubeQuery("search", {
					part: "snippet",
					maxResults: AddSongForm.NUM_SEARCH_RESULTS,
					q: this.state.songLink.replace(/ /g, "%20"),
					type: "video",
					videoCategoryId: 10,
					safeSearch: "strict",
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
							videoList[i].genreCategories = res.items[i].topicDetails.topicCategories
								.map((k: string) => k.replace("https://en.wikipedia.org/wiki/", ""));
						} else {
							res.items.splice(i, 1);
							videoList.splice(i, 1);
							i -= 1;
						}
					}
					this.setState({videoList: videoList});
				}).catch((err) => {
					console.error(err);
				});
			}
			callback();
		}
	};

	private static renderVideoObject(video: any): ReactNode {
		return (
			<div key={video.id.videoId} className={"flex-row"}>
				<Image
					path={video.snippet.thumbnails.high.url}
				/>
				<div className={"flex-column-center"} style={{width: "100%"}}>
					<a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
						<h2>{decodeHTML(video.snippet.title)}</h2></a>
					<p>{video.genreCategories ? video.genreCategories.join(", ") : ""}</p>
				</div>
			</div>
		);

	}

	public render(): ReactNode {
		return (
			<div className="add-song-form">
				<h3>Search a song</h3>
				<TextInput
					defaultText="Paste a YouTube song link here"
					submit={this.updateSongLink}
				/>
				{this.state.validLink ?
					<span className="valid-check valid-URL-text">The URL is valid</span> :
					<span className="valid-check invalid-URL-text">Please enter a valid YouTube URL!</span>}
				<TextButton
					text="Submit" bold={true}
					buttonColour="#6236FF"
					height={30}
					width={90}
					onAction={this.addSongSender(this.state.songLink)}
				/>
				<div className={"scrollable-container"} style={{maxHeight: "55vh"}}>
					{this.state.videoList.map(AddSongForm.renderVideoObject)}
				</div>
			</div>
		);
	}
}

export interface IAddSongFormProps extends IEnhancedComponentProps {
	addSong?: (callback: () => void) => void;
	selectedGenre?: GenreEnum | null;
	username?: string | null;
	songList?: ISongListObject;
}

export interface IAddSongFormState extends IEnhancedComponentState {
	songLink: string;
	validLink: boolean;
	videoList: any[];
}

// @ts-ignore
export default connect(AddSongForm.mapStateToProps)(AddSongForm);

