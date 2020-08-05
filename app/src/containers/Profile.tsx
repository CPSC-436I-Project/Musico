import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import "../components/css/Profile.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {IStore} from "src/redux/initialStore";
import {removeUser} from "src/redux/actions/userActions";
import {PageEnum} from ".";
import {connect} from "react-redux";
import {GenreEnum, Image, Song, TextButton} from "../components";
import UpdateProfilePicBar from "../components/UpdateProfilePicBar";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {getCookie} from "../utility/cookies";
import {API_URL} from "../utility/constants";
import {ProfileSongInfo} from "../components/ProfileSongInfo";
import {setSelectedGenre} from "../redux/actions";

class Profile extends Container<IProfileProps, IProfileState> {

    public static defaultProps: IProfileProps = {
        ...Container.defaultProps,
        profileImgSrc: profilePlaceholder,
    };

    public static mapStateToProps:(state: IStore, props: IProfileProps) => IProfileProps = (state: IStore, props: IProfileProps) => {
        return {
            ...props,
            profileImgSrc: state.userStore.profileImgSrc,
            username: state.userStore.username,
            requests: state.userStore.requests,
            likedSongs: state.userStore.likedSongs,
            favouriteGenres: state.userStore.favouriteGenres,
            channels: state.userStore.channels,
        };
    }

    private constructor(props: IProfileProps) {
        super(props);
        this.state = {
            requestsDetails: [],
            likedSongDetails: [],
            updateProfile: false
        };
        this.getSongs = this.getSongs.bind(this);
        this.picUpdateShown = this.picUpdateShown.bind(this);
        this.inflateFavGenres = this.inflateFavGenres.bind(this);
    }

    logOut = () => {
        this.props.dispatch(removeUser());
    };

    picUpdateShown = (callback: () => void) => {
        this.setState({updateProfile: !this.state.updateProfile}, callback);
    };

    private getSongs(idList: string[], stateToUpdate: Song[]): void {
        let that = this;
        const token = getCookie('auth-token');
        let updatedSongs: Song[] = [];
        Promise.all(
            idList.map((songID: string) => fetch(API_URL + 'songs/' + songID, {
                method: 'GET',
                headers: {'auth-token': token}
            })))
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
    };

    private inflateFavGenres(genre: GenreEnum): ReactNode {
        return (<TextButton
            key={genre}
            text={genre}
            fontSize={14}
            width={100}
            buttonColour={"#6236FF"}
            onAction={(callback: () => void) => {
                this.props.dispatch(setSelectedGenre(genre));
                this.props.changePage(PageEnum.Room);
                callback();
            }}
        />)
    };

    private static inflateSongs(song: Song): ReactNode {
        return (<ProfileSongInfo
            key={song.songName}
            pic={song.albumCover}
            name={song.songName}
        />)
    };

    public componentDidMount(): void {
        this.getSongs(this.props.requests, this.state.requestsDetails);
        this.getSongs(this.props.likedSongs, this.state.likedSongDetails);
    };

    public render(): ReactNode {
        return (
            <div className="profile">
                <div className="profile-head">
                    <Image path={this.props.profileImgSrc} width={170} height={170} rounded={true} backgroundColour={"#FFFFFF"}/>
                    <div className="profile-info">
                        <span className="username">
                            <h2>{this.props.username || "Unknown User"}</h2>
                            <div className="update-profile-buttons">
                                <span className="update-profile-pic">
                                    <TextButton text="Update Profile Picture" onAction={this.picUpdateShown} width={250}
                                                buttonColour={"#6236FF"}/>
                                </span>
                                <span className="log-out">
                                    <TextButton text="Log out" onAction={this.logOut} width={100}/>
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
                <div>
                    {this.state.updateProfile && <UpdateProfilePicBar onComplete={this.picUpdateShown}/>}
                </div>
                <div className="profile-fav-genres">
                    <h2> Favourite Genres </h2>
                    {this.props.favouriteGenres.map(this.inflateFavGenres)}
                </div>
                <div className="profile-songs">
                    <div className="profile-requested-songs">
                        <h2> Requested Songs </h2>
                        <div className="profile-requested-songs-inner">
                            {this.state.requestsDetails.map(Profile.inflateSongs)}
                        </div>
                    </div>
                    <div className="profile-liked-songs">
                        <h2> Liked Songs </h2>
                        <div className="profile-liked-songs-inner">
                            {this.state.likedSongDetails.map(Profile.inflateSongs)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export interface IProfileProps extends IContainerProps {
    profileImgSrc?: string;
    username?: string;
    requests?: string[];
    likedSongs?: string[];
    favouriteGenres?: GenreEnum[];
    channels?: string[];
}

export interface IProfileState extends IContainerState {
    requestsDetails: Song[];
    likedSongDetails: Song[];
    updateProfile: boolean;
}

// @ts-ignore
export default connect(Profile.mapStateToProps)(Profile);
