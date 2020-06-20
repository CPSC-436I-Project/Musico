import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";
import {addSong} from "../redux/actions";
import {GenreEnum} from "./index";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {ISongListObject} from "../utility/songs";

class AddSongForm extends EnhancedComponent<IAddSongFormProps, IAddSongFormState> {

    public static defaultProps: IAddSongFormProps = {
        ...EnhancedComponent.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IAddSongFormProps) => IAddSongFormProps = (state: IStore, props: IAddSongFormProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
            username: state.userStore.username,
            songList: state.songListStore.songs
        };
    }

    protected constructor(props: IAddSongFormProps) {
        super(props);
        this.state = {
            ...this.state,
            songLink: "",
        };
    }

    updateSongLink = (text: string) => {
        this.setState({songLink: text});
    };

    addSongSender = (link: string) => {
        return () => {
            this.props.dispatch(addSong("this.props.username", link, this.props.selectedGenre));
        }
    };

    public render(): ReactNode {
        return (
            <div className="add-song-form">
                <h3>Add a song</h3>
                <TextInput defaultText="Paste a YouTube song link here" submit={this.updateSongLink} />
                <TextButton text="Submit" bold={true} buttonColour="#6236FF" height={30} width={90} onAction={this.addSongSender(this.state.songLink)}/>
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
    songLink: string,
}

// @ts-ignore
export default connect(AddSongForm.mapStateToProps)(AddSongForm);
