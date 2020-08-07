import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container} from "../Container";
import Sidebar from "../../components/Sidebar";

class SidebarTest extends Container {

    public render(): ReactNode {
        return (
            <div className={"flex-column-center"}>
                <h2>Sidebar</h2>
                <Sidebar/>
            </div>
        );
    }
}

export {SidebarTest};
