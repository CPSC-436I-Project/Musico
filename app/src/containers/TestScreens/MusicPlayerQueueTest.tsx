import * as React from "react";
import { ReactNode } from "react";
import "../Container.css";
import { Container } from "../Container";
import { MusicPlayerQueue } from "../../components/MusicPlayerQueue";

class MusicPlayerQueueTest extends Container {
    public render(): ReactNode {
        return (
            <div>
                <h2>Music Player Queue</h2>
                <MusicPlayerQueue />
            </div>
        )
    }
}

export { MusicPlayerQueueTest }