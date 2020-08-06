import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import Chat from "../../components/Chat";

class ChatTest extends Container<IChatTestProps, IChatTestState> {

    public static defaultProps: IChatTestProps = {};

    protected constructor(props: IChatTestProps) {
        super(props);
        this.state = {};
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Chat</h2>
                <Chat/>
            </div>
        );
    }
}

export interface IChatTestProps extends IContainerProps {
}

export interface IChatTestState extends IContainerState {
}

export {ChatTest};
