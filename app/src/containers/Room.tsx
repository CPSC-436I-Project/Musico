import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container} from "./Container";
import Chat from "src/components/Chat";
import { MusicPlayerQueue } from "src/components/MusicPlayerQueue";

class Room extends Container {
	public render(): ReactNode {
		return (
			<div className="room">
				<Chat/>
			</div>
		);
	}
}

export {Room};
