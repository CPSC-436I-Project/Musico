import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";

// TODO this is still work in progress
class AddSongForm extends EnhancedComponent<IAddSongFormProps, IAddSongFormState> {

    public static defaultProps: IAddSongFormProps = {
    };

    protected constructor(props: IAddSongFormProps) {
        super(props);
        this.state = {
            ...this.state,
            songLink: "",
        };
    }

    addSong = (text: string) => {
        this.setState({songLink: text});
    };

    public render(): ReactNode {
        return (
            <div className="add-song-form">
                <h3>Add a song</h3>
                <TextInput defaultText="Paste a YouTube song link here" submit={this.addSong} />
                <TextButton text="Submit" bold={true} buttonColour="#6236FF" height={30} width={90} onAction={this.props.addSong}/>
            </div>
        );
    }
}

export interface IAddSongFormProps extends IEnhancedComponentProps {
    addSong?: (callback: () => void) => void;
}

export interface IAddSongFormState extends IEnhancedComponentState {
    songLink: string
}

export {AddSongForm};
