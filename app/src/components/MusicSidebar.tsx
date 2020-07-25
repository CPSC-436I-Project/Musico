import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {IStore} from "../redux/initialStore";
import {connect} from "react-redux";
import {GenreEnum} from ".";
import {MusicPlayerQueue} from "./MusicPlayerQueue";
import {TextButton} from "./buttons/TextButton";
import { API_URL } from "src/utility/constants";
import "./css/MusicSidebar.css";
import { CurrentlyPlaying } from "./CurrentlyPlaying";

class MusicSidebar extends EnhancedComponent<IMusicSidebarProps, IMusicSidebarState> {
    public static defaultProps: IMusicSidebarProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IMusicSidebarProps) => IMusicSidebarProps = (state: IStore, props: IMusicSidebarProps) => {
        return {
            ...props,
            musicSidebarOpen: state.musicSidebarStore.musicSidebarOpen,
            selectedGenre: state.musicSidebarStore.selectedGenre,
        };
    }

    protected constructor(props: IMusicSidebarProps) {
        super(props);
        this.state = {
            musicSidebarOpen: true,
            queue: [],
            currentlyPlaying: {
                songName: "default",
                artists: [],
                genre: "Pop",
                src: "",
                requesterID: 0,
                albumCover: "",
                numVotes: 0
            },
        };

        this.getChannelQueue = this.getChannelQueue.bind(this);
        this.getSongsFromQueue = this.getSongsFromQueue.bind(this);
    }

    componentDidMount = () => {
        if (this.props.selectedGenre === null) {
            console.log("No selected genre!");
        } else {
            this.getChannelQueue(this.props.selectedGenre);
        }
    }

    componentDidUpdate = (previousProps: any) => {
        if (this.props.selectedGenre !== previousProps.selectedGenre) {
            if (this.props.selectedGenre === null) {
                console.log("No selected genre!");
                return;
            } else {
                this.setState({queue: []});
                this.getChannelQueue(this.props.selectedGenre);
            }
        }
    }

    private getChannelQueue(genre: GenreEnum) {
        console.log("Getting queue");
        fetch(API_URL + "queues/" + genre, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((songIds: string[]) => {
            this.getSongsFromQueue(songIds);
        })
    }

    private getSongsFromQueue(ids: string[]) {
        let song: Song = {
            songName: "default",
            artists: [],
            genre: "Pop",
            src: "",
            requesterID: 0,
            albumCover: "",
            numVotes: 0
        }

        return Promise.all(
            ids.map((id: string) => fetch(API_URL + "songs/" + id, {
                method: 'GET'
            })))
            .then((responses) => {
                return Promise.all(responses.map(response => response.json()))
            })
            .then((songs: Song[]) => {
                songs.forEach((item: Song) => {
                    song = item;
                    if (song.songName !== "default") {
                        let queue: Song[] = this.state.queue;
                        let updatedQueue: Song[] = queue.concat(song);
                        return this.setState({queue: updatedQueue});
                    }
                })
            })
            .then(() => {
                return Promise.resolve();
            })
            .catch(() => {
                return Promise.reject();
            })
    }

    public render(): ReactNode {
        return (
            <div className="music-sidebar">
                <div className="currently-playing">
                    <CurrentlyPlaying song={this.state.queue[0]}/>
                </div>
                <div className="music-player-queue">
                    <MusicPlayerQueue queue={this.state.queue.slice(1)}/>
                </div>
                <div className="add-music-button">
                    <TextButton
                        text={"+ Add Music"}
                        bold={true}
                        buttonColour="#6236FF"
					    height={44}
                        width={204}
                        fontSize={20}
				    />
                </div>
            </div>
        )
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

export interface IMusicSidebarProps extends IEnhancedComponentProps {
    width?: number,
    height?: number,
    dispatch?: any,
    musicSidebarOpen?: boolean,
    selectedGenre?: GenreEnum | null;
}

export interface IMusicSidebarState extends IEnhancedComponentState {
    musicSidebarOpen: boolean,
    queue: any[],
    currentlyPlaying: Song,
}

// @ts-ignore
export default connect(MusicSidebar.mapStateToProps)(MusicSidebar);
