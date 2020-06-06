import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "../Container";
import {PopupContainer} from "../PopupContainer";
import {AddSongForm} from "../../components/AddSongForm";

class PopupTest extends Container<IMainContainerProps, IMainContainerState> {

    public static defaultProps: IMainContainerProps = {
    };

    protected constructor(props: IMainContainerProps) {
        super(props);
        this.state = {};
    }

    // openPopup = () => {
    //     this.setState({popupOpen: true});
    // };
    //
    // closePopup = () => {
    //     this.setState({popupOpen: false});
    // };

    popupRender = () => {
        return (
            <AddSongForm/>
            )
    };


    public render(): ReactNode {
        return (
            <div className="main">
                <button id="openPopup" onClick={this.openPopup}>Open Popup</button>
            </div>
        );
    }
}

export interface IMainContainerProps extends IContainerProps {
}

export interface IMainContainerState extends IContainerState {
}

export {PopupTest};
