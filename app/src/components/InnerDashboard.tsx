import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {DashboardSongInfo} from "./DashboardSongInfo";
import {Image} from "./Image"
import {GenreEnum} from "./index";
import {ISidebarProps} from "./Sidebar";

class InnerDashboard extends EnhancedComponent<IInnerDashboardProps, IInnerDashboardState> {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    private constructor(props: ISidebarProps) {
        super(props);
        this.state = {topSongs: []};
        this.getTopSongsOnQueues = this.getTopSongsOnQueues.bind(this);
        this.addTopSong = this.addTopSong.bind(this);
    }

    private getTopSongsOnQueues(): void {
        // fetch('/queues')                     // use this when deploying app
        fetch('http://localhost:9000/queues')       // use this for now
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
        let topSong: Song = {
            songName: "default",
            artists: ["shouldn't", "see", "this"],
            genre: "Jazz",
            src: "",
            requesterID: 0,
            albumCover: "",
            numVotes: 0
        };
        return Promise.all(
            // queue.map((songID: string) => fetch('/songs/' + songID)            // for deployment
            queue.map((songID: string) => fetch('http://localhost:9000/songs/' + songID)))
            .then((responses) => {
                return Promise.all(responses.map(response => response.json()))
            })
            .then((songs: Song[]) => {
                songs.forEach(function (song: Song) {
                    if (song.numVotes > topSong.numVotes && song.genre in GenreEnum) {
                        topSong = song;
                    }
                })
            })
            .then(() => {
                let topSongs: Song[] = this.state.topSongs;
                let updatedTopSongs: Song[] = topSongs.concat(topSong);
                this.setState({topSongs: updatedTopSongs});
                return Promise.resolve();
            })
            .catch(() => {
                return Promise.reject();
            });
    }

    public componentDidMount(): void {
        this.getTopSongsOnQueues();
    }

    public render(): ReactNode {
        const audioWaveIcon: string = "https://img.icons8.com/nolan/64/audio-wave.png";
        let nextSongs = [];
        this.state.topSongs.forEach(function(song: Song) {
            nextSongs.push(<DashboardSongInfo
                genre={song.genre}
                pic={song.albumCover}
                name={song.songName}
                artists={song.artists}
            />);
        });

        return (
        <div className="inner_dashboard">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flexstart",
                    }}
                >
                    <Image width={40} height={40} path={audioWaveIcon}/>
                    <h2> Playing next </h2>
                </div>
                <div className="dashboard_trending">
                    nextSongs
                </div>
            </div>);
    }
}

interface Song {
    songName: string,
    artists: string[],
    genre: string,
    src: string,
    requesterID: any,
    albumCover: string,
    numVotes: number
}

export interface IInnerDashboardProps extends IEnhancedComponentProps {
}

export interface IInnerDashboardState extends IEnhancedComponentState {
    topSongs: Song[];
}

export {InnerDashboard};
