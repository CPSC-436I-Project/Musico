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
        };
    }

    public render(): ReactNode {
        return (
            <div className="add-song-form">
                <h2>Add a song to the queue:</h2>
                <TextInput defaultText="Paste a YouTube song link here" width={300}/>
                <TextButton text="Submit" bold={true} buttonColour="#6236FF" height={30} width={90}/>
            </div>
        );
    }
}

export interface IAddSongFormProps extends IEnhancedComponentProps {

}

export interface IAddSongFormState extends IEnhancedComponentState {
}

export {AddSongForm};
