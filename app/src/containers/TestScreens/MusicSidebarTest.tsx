import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";
import MusicSidebar from "../../components/MusicSidebar";

class MusicSidebarTest extends Container {
    public render(): ReactNode {
        return (
            <div className={"flex-column-center"}>
                <h2>Music Sidebar</h2>
                <MusicSidebar/>
            </div>
        );
    }
}

export {MusicSidebarTest};
