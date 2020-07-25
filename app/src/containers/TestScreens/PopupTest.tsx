import * as React from "react";
import {ReactNode} from "react";
import {Container, IContainerProps, IContainerState} from "../Container";
import {AddSongForm} from "../../components";
import {connect} from "react-redux";
import {IStore} from "../../redux/initialStore";

class PopupTest extends Container<IMainContainerProps, IMainContainerState> {

    public static defaultProps: IMainContainerProps = {
        ...Container.defaultProps,
    };

    public static mapStateToProps:(state: IStore, props: IMainContainerProps) => IMainContainerProps = (state: IStore, props: IMainContainerProps) => {
        return {
            ...props,
            ...Container.mapStateToProps(state, props),
        };
    }

    protected constructor(props: IMainContainerProps) {
        super(props);
        this.state = {
            ...this.state,
        };
    }

    protected popupRender(): ReactNode {
        return (
            <AddSongForm/>
        );
    };

    public render(): ReactNode {
        return (
            <div className="main">
                <h2>Adding songs from YouTube:</h2>
                <button id="openPopup" onClick={this.openPopup}>Add a song!</button>
            </div>
        );
    }
}

export interface IMainContainerProps extends IContainerProps {

}

export interface IMainContainerState extends IContainerState {

}

// @ts-ignore
export default connect(Container.mapStateToProps)(PopupTest);
