import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {Image} from "./Image"
import {IStore} from "../redux/initialStore";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {connect} from "react-redux";
import {TextButton} from "./buttons/TextButton";
import {removeUser} from "src/redux/actions/userActions";
import {Song} from "./index";
import {ProfileSongInfo} from "./ProfileSongInfo";

class InnerProfile extends EnhancedComponent<IInnerProfileProps, IInnerProfileState> {

    public static defaultProps: IInnerProfileProps = {
        ...EnhancedComponent.defaultProps,
        profileImgSrc: profilePlaceholder
    };

    private constructor(props: IInnerProfileProps) {
        super(props);
        this.state = {
            requestsDetails: [],
            likedSongDetails: []
        };
        this.getSongs = this.getSongs.bind(this);
    }

    public static mapStateToProps: (state: IStore, props: IInnerProfileProps) => IInnerProfileProps = (state: IStore, props: IInnerProfileProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc,
            username: state.userStore.username,
            requests: state.userStore.requests,
            likedSongs: state.userStore.likedSongs,
            favouriteGenres: state.userStore.favouriteGenres,
            channels: state.userStore.channels
        };
    };

    logOut = () => {
        this.props.dispatch(removeUser());
        // TODO: route to the <App> so that login screen is shown or refresh the page
    };

    private getSongs(idList: string[], stateToUpdate: Song[]): void {
        let that = this;
        let updatedSongs: Song[] = [];
        Promise.all(
            // queue.map((songID: string) => fetch('/songs/' + songID)            // for deployment
            idList.map((songID: string) => fetch('http://localhost:9000/songs/' + songID)))
            .then((responses) => {
                return Promise.all(responses.map(response => response.json()))
            })
            .then((songs: Song[]) => {
                songs.forEach(function (song: Song) {
                    updatedSongs.push(song);
                })
            })
            .then(() => {
                if (stateToUpdate === this.state.requestsDetails) {
                    return that.setState({requestsDetails: updatedSongs});
                } else {
                    return that.setState({likedSongDetails: updatedSongs});
                }
            })
    }

    public componentDidMount(): void {
        this.getSongs(this.props.requests, this.state.requestsDetails);
        this.getSongs(this.props.likedSongs, this.state.likedSongDetails);
    };

    public render(): ReactNode {
        let favGenreList: any[] = [];
        this.props.favouriteGenres.forEach(function (genre: string) {
            favGenreList.push(<TextButton
                text={genre}
            />)
        });
        let requestedSongsList: any[] = [];
        this.state.requestsDetails.forEach(function (song: Song) {
            requestedSongsList.push(<ProfileSongInfo
                pic={song.albumCover}
                name={song.songName}
                artists={song.artists}
            />);
        });
        let likedSongsList: any[] = [];
        this.state.likedSongDetails.forEach(function (song: Song) {
            likedSongsList.push(<ProfileSongInfo
                pic={song.albumCover}
                name={song.songName}
                artists={song.artists}
            />);
        });
        return (
            <div className="inner_profile">
                <div className="profile_head">
                    <Image path={this.props.profileImgSrc} width={170} height={170}/>
                    <h2>{this.props.username || "Unknown User"}</h2>
                    <span className="log_out">
                        <TextButton text="Log out" onAction={this.logOut} width={100}/>
                    </span>
                </div>
                <div className="profile_fav_genres">
                    <h2> Favourite Genres </h2>
                    {favGenreList}
                </div>
                <div className="profile_songs">
                    <div className="profile_requested_songs">
                        <h2> Requested Songs </h2>
                        <div className="profile_requested_songs_inner">
                            {requestedSongsList}
                        </div>
                    </div>
                    <div className="profile_liked_songs">
                        <h2> Liked Songs </h2>
                        <div className="profile_liked_songs_inner">
                            {likedSongsList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export interface IInnerProfileProps extends IEnhancedComponentProps {
    profileImgSrc?: string;
    username?: string;
    requests?: string[];
    likedSongs?: string[];
    favouriteGenres?: string[];
    channels?: string[];
}

export interface IInnerProfileState extends IEnhancedComponentState {
    requestsDetails: Song[];
    likedSongDetails: Song[];
}

// @ts-ignore
export default connect(InnerProfile.mapStateToProps)(InnerProfile);
