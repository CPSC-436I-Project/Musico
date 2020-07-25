import {Button} from "./buttons/Button";
import {TextButton} from "./buttons/TextButton";
import {ExpandableButton} from "./buttons/ExpandableButton";
import AddSongForm from "./AddSongForm";
import {EnhancedComponent} from "./EnhancedComponent";
import Header from "./Header";
import {Image} from "./Image";
import MusicSidebar from "./MusicSidebar";
import Sidebar from "./Sidebar";
import {TextInput} from "./TextInput";
import {YOUTUBE_API_KEY} from "../utility/constants";

enum GenreEnum {
	BLUES = "Blues",
	CHRISTIAN = "Christian",
	ELECTRONIC = "Electronic",
	GAMING = "Gaming",
	ROCK = "Rock",
	LO_FI = "Lo-Fi",
	REGGAE = "Reggae",
	COUNTRY = "Country",
	HIP_HOP = "Hip-Hop",
	JAZZ = "Jazz",
	POP = "Pop",
	RAP = "Rap",
	CLASSICAL = "Classical",
}

enum ExpansionState {
	EXPANDED = "expanded",
	COLLAPSED = "collapsed",
}

const txt = document.createElement("textarea");

async function youtubeQuery(type: string, options: any): Promise<any> {
	let optionsString = Object.keys(options).map((k) => `${k}=${options[k]}`).join("&");
	optionsString += `&key=${YOUTUBE_API_KEY}`;
	const url = `https://www.googleapis.com/youtube/v3/${type}?${optionsString}`;

	return fetch(url)
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
}

function decodeHTML(snippet: string) {
	txt.innerHTML = snippet;
	return txt.value;
}

export {
	GenreEnum, ExpansionState,
	Button, TextButton, ExpandableButton,
	AddSongForm, EnhancedComponent, Header, Image, MusicSidebar, Sidebar, TextInput,
	youtubeQuery, decodeHTML,
};
