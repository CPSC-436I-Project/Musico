import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Dashboard.css";
import {DashboardSongInfo} from "./DashboardSongInfo";
import {Image} from "./Image"
import {GenreEnum} from "./index";
import {getCookie} from "../utility/cookies";
import {API_URL} from "../utility/constants";
import { ISongInterface, defaultSong } from "src/utility/songs";

class InnerDashboard extends EnhancedComponent<IInnerDashboardProps, IInnerDashboardState> {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    private constructor(props: IInnerDashboardProps) {
        super(props);
        this.state = {topSongs: []};
        this.getTopSongsOnQueues = this.getTopSongsOnQueues.bind(this);
        this.addTopSong = this.addTopSong.bind(this);
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
        let topSong: ISongInterface = defaultSong;
        return Promise.all(
            queue.map((songID: string) => fetch(API_URL + 'songs/' + songID, {
                method: 'GET',
                headers: {'auth-token': token}
            })))
            .then((responses) => {
                return Promise.all(responses.map(response => response.json()))
            })
            .then((songs: ISongInterface[]) => {
                songs.forEach(function (song: ISongInterface) {
                    // @ts-ignore //lint error for string enums because they can't be reverse mapped
                    if (song !== null && song.numVotes > topSong.numVotes && Object.values(GenreEnum).includes(song.genre)) {
                        topSong = song;
                    }
                });
            })
            .then(() => {
                if (topSong.songName !== "default") {
                    let topSongs: ISongInterface[] = that.state.topSongs;
                    let updatedTopSongs: ISongInterface[] = topSongs.concat(topSong);
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

    private static createSongInfo(song: ISongInterface): ReactNode {
        return (<DashboardSongInfo
            key={song.songName + Math.random() * 10000}
            genre={song.genre}
            albumCover={song.albumCover}
            songName={song.songName}
        />);
    }

    public componentDidMount(): void {
        this.getTopSongsOnQueues();
    };

    public render(): ReactNode {
        return (
            <div className="inner-dashboard">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flexstart",
                    }}
                >
                    <Image width={40} height={40} path={"https://img.icons8.com/nolan/64/audio-wave.png"}/>
                    <h2> Playing next </h2>
                </div>
                <div className="dashboard-trending">
                    {this.state.topSongs.map(InnerDashboard.createSongInfo)}
                </div>
            </div>
        );
    }
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
    topSongs: ISongInterface[];
}

export {InnerDashboard};
