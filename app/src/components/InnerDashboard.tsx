import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {DashboardSongInfo} from "./DashboardSongInfo";
import {Image} from "./Image"
import {GenreEnum} from "./index";
import {ISidebarProps} from "./Sidebar";

class InnerDashboard extends EnhancedComponent {

    public static defaultProps: IInnerDashboardProps = {
        ...EnhancedComponent.defaultProps,
    };

    private constructor(props: ISidebarProps) {
        super(props);
        this.state = {topSongs: []};
        this.getTopSongsOnQueues = this.getTopSongsOnQueues.bind(this);
    }

    private getTopSongsOnQueues(): void {

        console.log("inside getTopSongsOnQueues");

        let topSongs: Song[] = [];
        // fetch('/queues')                     // use this when deploying app
        fetch('http://localhost:9000/queues')       // use this for now
            .then(response => response.json())
            .then(queues => {
                return queues.map(function(obj: any) {
                    return obj.queue;
                });
            })
            .then(queue => {
                queue.forEach(function (q: []) {
                    let topSong: Song = {
                        songName: "default",
                        artists: ["shouldn't", "see", "this"],
                        genre: GenreEnum.JAZZ,
                        src: "",
                        requesterID: 0,
                        albumCover: "",
                        numVotes: 0
                    };
                    q.forEach(function (song: Song) {
                        if (song.numVotes > topSong.numVotes) {
                            topSong = song;
                        }
                    });
                    topSongs.push(topSong);
                });
                console.log(topSongs);

                this.setState({topSongs: topSongs});
            });
    }

    public componentDidMount(): void {
        this.getTopSongsOnQueues();
    }

    public render(): ReactNode {
        const audioWaveIcon = "https://img.icons8.com/nolan/64/audio-wave.png"
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
                    <h2> Trending Music </h2>
                </div>
                <div className="dashboard_trending">

                    // UPDATE THESE TO GET DATA FROM DB!!!

                    {/*<DashboardSongInfo genre={GenreEnum.ELECTRONIC}/>*/}
                    {/*<DashboardSongInfo genre={GenreEnum.HIP_HOP}/>*/}
                    {/*<DashboardSongInfo genre={GenreEnum.JAZZ}/>*/}
                </div>
            </div>);
    }
}

interface Song {
    songName: string,
    artists: string[],
    genre: GenreEnum,
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
