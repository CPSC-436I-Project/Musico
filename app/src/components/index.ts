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
	BLUES = "Blues",
	CHRISTIAN = "Christian",
	ROCK = "Rock",
	REGGAE = "Reggae",
	COUNTRY = "Country",
	JAZZ = "Jazz",
	POP = "Pop",
	CLASSICAL = "Classical",

	// TODO @Breanne: Add these
	// CHILDREN = "Children",
	// INDEPENDENT = "Independent",
	// ASIAN = "Asian",
	// LATIN_AMERICAN = "Latin American",
	// SOUL = "Soul",
	// OTHER = "Other",

	// TODO @Breanne: Remove these
	ELECTRONIC = "Electronic",
	GAMING = "Gaming",
	LO_FI = "Lo-Fi",
	HIP_HOP = "Hip-Hop",
	RAP = "Rap",
}

const genreIDMap: { [key: string]: GenreEnum } = {
	"/m/02mscn": GenreEnum.CHRISTIAN, 		// Christian music
	"/m/0ggq0m": GenreEnum.CLASSICAL, 		// Classical music
	"/m/01lyv": GenreEnum.COUNTRY, 			// Country
	"/m/02lkt": GenreEnum.ELECTRONIC, 		// Electronic music
	"/m/0glt670": GenreEnum.HIP_HOP, 		// Hip hop music
	"/m/03_d0": GenreEnum.JAZZ, 			// Jazz
	"/m/064t9": GenreEnum.POP, 				// Pop music
	"/m/06cqb": GenreEnum.REGGAE, 			// Reggae
	"/m/06j6l": GenreEnum.BLUES, 			// Rhythm and blues
	"/m/06by7": GenreEnum.ROCK, 			// Rock music

	// TODO: @Breanne: Add these
	// "/m/0gywn": GenreEnum.SOUL, 			// Soul music
	// "/m/05fw6t": GenreEnum.CHILDREN, 		// Children's music
	// "/m/05rwpb": GenreEnum.INDEPENDENT, 	// Independent music
	// "/m/028sqc": GenreEnum.ASIAN, 			// Music of Asia
	// "/m/0g293": GenreEnum.LATIN_AMERICAN, 	// Music of Latin America
	// "/m/04rlf": GenreEnum.OTHER, 			// Music
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

export {
	GenreEnum, ExpansionState,
	Button, TextButton, ExpandableButton,
	AddSongForm, EnhancedComponent, Header, Image, MusicSidebar, Sidebar, TextInput,
	youtubeQuery, decodeHTML,
	genreIDMap,
};
