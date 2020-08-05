import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {connect} from "react-redux";
import { IStore } from "src/redux/initialStore";
import {GenreEnum, Image, Song} from "../components";
import {DashboardSongInfo} from "../components/DashboardSongInfo";
import {getCookie} from "../utility/cookies";
import {API_URL} from "../utility/constants";
import {setSelectedGenre} from "../redux/actions";
import {PageEnum} from "./index";

class Dashboard extends Container<IDashboardProps, IDashboardState> {
	public static mapStateToProps:(state: IStore, props: IDashboardProps) => IDashboardProps = (state: IStore, props: IDashboardProps) => {
		return {
			...props,
			...Container.mapStateToProps(state, props),
			selectedGenre: state.chatRoomStore.selectedGenre,
		};
	}

	protected constructor(props: any) {
		super(props);

		this.state = {
			...this.state,
			topSongs: [],
		}

		this.getTopSongsOnQueues = this.getTopSongsOnQueues.bind(this);
		this.addTopSong = this.addTopSong.bind(this);
		this.navigateToRoom = this.navigateToRoom.bind(this);
		this.createSongInfo = this.createSongInfo.bind(this);
	}

	private getTopSongsOnQueues(): void {
		const token = getCookie('auth-token');
		fetch(API_URL + 'queues', {
			method: 'GET',
			headers: {
				'auth-token': token
			}
		})
			.then(response => response.json())
			.then(queues => {
				return queues.map(function (obj: any) {
					return obj.queue;
				});
			})
			.then(queueList => {
				let queueRequests = queueList.map((queue: string[]) =>
					this.addTopSong(queue));
				Promise.all(queueRequests);
			});
	}

	private addTopSong(queue: string[]): Promise<void> {
		let that = this;
		const token = getCookie('auth-token');
		let topSong: Song = {
			songName: "default",
			genre: "Jazz",
			src: "",
			requesterID: 0,
			albumCover: "",
			numVotes: 0
		};
		return Promise.all(
			queue.map((songID: string) => fetch(API_URL + 'songs/' + songID, {
				method: 'GET',
				headers: {'auth-token': token}
			})))
			.then((responses) => {
				return Promise.all(responses.map(response => response.json()))
			})
			.then((songs: Song[]) => {
				songs.forEach(function (song: Song) {
					// @ts-ignore //lint error for string enums because they can't be reverse mapped
					if (song !== null && song.numVotes > topSong.numVotes && Object.values(GenreEnum).includes(song.genre)) {
						topSong = song;
					}
				});
			})
			.then(() => {
				if (topSong.songName !== "default") {
					let topSongs: Song[] = that.state.topSongs;
					let updatedTopSongs: Song[] = topSongs.concat(topSong);
					return that.setState({topSongs: updatedTopSongs});
				}
			})
			.then(() => {
				return Promise.resolve();
			})
			.catch((err) => {
				console.log(err);
				return Promise.reject();
			});
	}

	private navigateToRoom(genre: GenreEnum): (callback: () => void) => void {
		return (callback: () => void) => {
			this.props.dispatch(setSelectedGenre(genre));
			this.props.changePage(PageEnum.Room);
			callback();
		};
	}

	private createSongInfo(song: Song): ReactNode {
		return (<DashboardSongInfo
			key={song.songName + Math.random() * 10000}
			genre={song.genre}
			albumCover={song.albumCover}
			songName={song.songName}
			onButtonClick={this.navigateToRoom(song.genre as GenreEnum)} // TODO: @Adi pls remove this type casting after your merge your changes
		/>);
	}

	public componentDidMount(): void {
		this.getTopSongsOnQueues();
	};

	public render(): ReactNode {
		return (
			<div className={"dashboard dashboard_lower dashboard-display"}>
				<div className="inner-dashboard">
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-start",
						}}
					>
						<Image width={40} height={40} path={"https://img.icons8.com/nolan/64/audio-wave.png"}/>
						<h2> Playing next </h2>
					</div>
					<div className="dashboard-trending">
						{this.state.topSongs.map(this.createSongInfo)}
					</div>
				</div>
			</div>
		);
	}
}

export interface IDashboardProps extends IContainerProps {
	selectedGenre?: string;
}

export interface IDashboardState extends IContainerState {
	sidebarOpen?: boolean;
	topSongs: Song[];
}

// @ts-ignore
export default connect(Dashboard.mapStateToProps)(Dashboard);
