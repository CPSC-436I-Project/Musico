import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";
import {TextInput} from "./TextInput";

// TODO this is still work in progress
class AddSongForm extends EnhancedComponent<IAddSongFormProps, IAddSongFormState> {

    public static defaultProps: IAddSongFormProps = {
        width: 15,
        text: "",
    };

    protected constructor(props: IAddSongFormProps) {
        super(props);
        this.state = {
            linkInputVal: ""
        };
    }

    handleChange = (e: any) => {
        this.setState({linkInputVal: e.target.value});
    };

    public render(): ReactNode {
        return (
            <div className="addSongForm">
                <h2>Add a song to the queue:</h2>
                <TextInput defaultText="Paste a YouTube song link here" />
                <input id="message_tb" type="text" value={this.state.linkInputVal} onChange={this.handleChange} placeholder="Paste a YouTube song link here"/>
                <TextButton text="Submit" bold={true}/>
            </div>
        );
    }
}

export interface IAddSongFormProps extends IEnhancedComponentProps {

}

export interface IAddSongFormState extends IEnhancedComponentState {
    linkInputVal: string,
}

export {AddSongForm};
