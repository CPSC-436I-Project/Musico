import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "./Container";
import {PopupContainer} from "./PopupContainer";
import {AddSongForm} from "../components/AddSongForm";

// TODO this is for experimentation only
class MainContainer extends Container<IMainContainerProps, IMainContainerState> {

    public static defaultProps: IMainContainerProps = {
    };

    protected constructor(props: IMainContainerProps) {
        super(props);
        this.state = {
            popupOpen: false
        };
    }

    openPopup = () => {
        this.setState({popupOpen: true});
    };

    closePopup = () => {
        this.setState({popupOpen: false});
    };


    public render(): ReactNode {
        return (
            <div className="main">
                <button id="openPopup" onClick={this.openPopup}>Open Popup</button>
                {this.state.popupOpen &&
                <PopupContainer closeFn={this.closePopup} >
                    <AddSongForm/>
                </PopupContainer>}
            </div>
        );
    }
}

export interface IMainContainerProps extends IContainerProps {
}

export interface IMainContainerState extends IContainerState {
    popupOpen: boolean
}

export {MainContainer};
