import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";
import {VoteButtonsContainer} from "../../components/VoteButtonsContainer";

class VoteButtonTest extends Container {

    public render(): ReactNode {
        return (
            <div className={"VoteButtonTest"}>
                <h2>Vote Button</h2>
                <VoteButtonsContainer/>
            </div>
        );
    }
}

export {VoteButtonTest};
