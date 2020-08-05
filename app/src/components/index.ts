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

enum ExpansionState {
	EXPANDED = "expanded",
	COLLAPSED = "collapsed",
}

enum GenreEnum {
	ASIAN = "Asian",
	BLUES = "Blues",
	CHILDREN = "Children",
	CHRISTIAN = "Christian",
	CLASSICAL = "Classical",
	COUNTRY = "Country",
	ELECTRONIC = "Electronic",
	HIP_HOP = "Hip-Hop",
	INDEPENDENT = "Independent",
	JAZZ = "Jazz",
	LATIN = "Latin",
	OTHER = "Other",
	POP = "Pop",
	REGGAE = "Reggae",
	ROCK = "Rock",
	SOUL = "Soul",
}

const genreIDMap: { [key: string]: GenreEnum } = {
	"/m/028sqc": GenreEnum.ASIAN,			// Asian music
	"/m/06j6l": GenreEnum.BLUES,			// Blues music
	"/m/05fw6t": GenreEnum.CHILDREN,		// Children's music
	"/m/02mscn": GenreEnum.CHRISTIAN,		// Christian music
	"/m/0ggq0m": GenreEnum.CLASSICAL,		// Classical music
	"/m/01lyv": GenreEnum.COUNTRY,			// Country music
	"/m/02lkt": GenreEnum.ELECTRONIC,		// Electronic music
	"/m/0glt670": GenreEnum.HIP_HOP,		// Hip Hop music
	"/m/05rwpb": GenreEnum.INDEPENDENT,		// Independent music
	"/m/03_d0": GenreEnum.JAZZ,				// Jazz music
	"/m/0g293": GenreEnum.LATIN,			// Latin American music
	"/m/04rlf": GenreEnum.OTHER,			// Other music
	"/m/064t9": GenreEnum.POP,				// Pop music
	"/m/06cqb": GenreEnum.REGGAE,			// Reggae music
	"/m/06by7": GenreEnum.ROCK,				// Rock music
	"/m/0gywn": GenreEnum.SOUL,				// Soul music
}

const txt = document.createElement("textarea");

async function youtubeQuery(type: string, options: any): Promise<any> {
	const optionKeys = Object.keys(options);
	const optionsString = optionKeys
		.map((k) => `${k}=${options[k]}`)
		.join("&") + `${optionKeys.length > 0 ? "&" : ""}key=${YOUTUBE_API_KEY}`;
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

export interface Song {
	songName: string,
	genre: string,
	src: string,
	requesterID: any,
	albumCover: string,
	numVotes: number
}

export {
	GenreEnum, ExpansionState,
	Button, TextButton, ExpandableButton,
	AddSongForm, EnhancedComponent, Header, Image, MusicSidebar, Sidebar, TextInput,
	youtubeQuery, decodeHTML,
	genreIDMap,
};
