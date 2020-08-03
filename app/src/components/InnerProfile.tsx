import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./css/Profile.css";
import {Image} from "./Image"
import {IStore} from "../redux/initialStore";
import profilePlaceholder from "../icons/profile-placeholder.png";
import {connect} from "react-redux";
import {TextButton} from "./buttons/TextButton";
import {removeUser} from "src/redux/actions/userActions";
import {Song} from "./index";
import {ProfileSongInfo} from "./ProfileSongInfo";
import UpdateProfilePicBar from "./UpdateProfilePicBar";
import {getCookie} from "../utility/cookies";
import {API_URL} from "../utility/constants";


class InnerProfile extends EnhancedComponent<IInnerProfileProps, IInnerProfileState> {

    public static defaultProps: IInnerProfileProps = {
        ...EnhancedComponent.defaultProps,
        profileImgSrc: profilePlaceholder
    };

    private constructor(props: IInnerProfileProps) {
        super(props);
        this.state = {
            requestsDetails: [],
            likedSongDetails: [],
            updateProfile: false
        };
        this.getSongs = this.getSongs.bind(this);
        this.picUpdateShown = this.picUpdateShown.bind(this);
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
    }

    private static inflateFavGenres(genre: string): ReactNode {
        return (<TextButton
            key={genre}
            text={genre}
            fontSize={14}
            width={100}
            buttonColour={"#6236FF"}
        />)
    }

    public componentDidMount(): void {
        this.getSongs(this.props.requests, this.state.requestsDetails);
        this.getSongs(this.props.likedSongs, this.state.likedSongDetails);
    };

    public render(): ReactNode {

        console.log("profile");
        console.log(this.props.favouriteGenres);

        //
        // let favGenreList: any[] = [];
        // this.props.favouriteGenres.forEach(function (genre: string) {
        //
        //     console.log("profile fav genre loop");
        //     console.log(genre);
        //
        //     favGenreList.push(<TextButton
        //         text={genre}
        //         fontSize={14}
        //         width={100}
        //         buttonColour={"#6236FF"}
        //     />)
        // });
        let requestedSongsList: any[] = [];
        this.state.requestsDetails.forEach(function (song: Song) {
            requestedSongsList.push(<ProfileSongInfo
                pic={song.albumCover}
                name={song.songName}
            />);
        });
        let likedSongsList: any[] = [];
        this.state.likedSongDetails.forEach(function (song: Song) {
            likedSongsList.push(<ProfileSongInfo
                pic={song.albumCover}
                name={song.songName}
            />);
        });
        return (
            <div className="inner-profile">
                <div className="profile-head">
                    <Image path={this.props.profileImgSrc} width={170} height={170}/>
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
                    {this.props.favouriteGenres.map(InnerProfile.inflateFavGenres)}
                </div>
                <div className="profile-songs">
                    <div className="profile-requested-songs">
                        <h2> Requested Songs </h2>
                        <div className="profile-requested-songs-inner">
                            {requestedSongsList}
                        </div>
                    </div>
                    <div className="profile-liked-songs">
                        <h2> Liked Songs </h2>
                        <div className="profile-liked-songs-inner">
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
    updateProfile: boolean;
}

// @ts-ignore
export default connect(InnerProfile.mapStateToProps)(InnerProfile);
