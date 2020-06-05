import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextButton} from "./buttons/TextButton";

// TODO not done
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
            <div>
                <input id="message_tb" type="text" value={this.state.linkInputVal} onChange={this.handleChange}/>
                <TextButton text="Submit"/>
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
