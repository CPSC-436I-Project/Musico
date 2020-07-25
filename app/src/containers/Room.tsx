import * as React from "react";
import {ReactNode} from "react";
import "../components/css/Room.css";
import {Container} from "./Container";
import Chat from "src/components/Chat";
import {MusicSidebar} from "src/components";

class Room extends Container {
	public render(): ReactNode {
		return (
			<div className="room">
				<div className="chat">
					<Chat/>
				</div>
				<div className="music-sidebar">
					<MusicSidebar />	
				</div>
			</div>
		);
	}
}

export {Room};
