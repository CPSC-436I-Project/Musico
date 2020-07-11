import AddSongForm from "./AddSongForm";
import {EnhancedComponent} from "./EnhancedComponent";
import Header from "./Header";
import {Image} from "./Image";
import Sidebar from "./Sidebar";
import {TextInput} from "./TextInput";

enum GenreEnum {
	ELECTRONIC = "Electronic",
	ROCK = "Rock",
	LO_FI = "Lo-Fi",
	REGGAE = "Reggae",
	COUNTRY = "Country",
	HIP_HOP = "Hip-Hop",
	JAZZ = "Jazz",
	RAP = "Rap",
}

const API_KEY = "";
async function youtubeQuery(type: string, options: any): Promise<any> {
	let optionsString = Object.keys(options).map((k) => `${k}=${options[k]}`).join("&");
	optionsString += `&key=${API_KEY}`;
	const url = `https://www.googleapis.com/youtube/v3/${type}?${optionsString}`;

	return fetch(url).then((res) => res.json());
}

function decodeHTML(snippet: string) {
	const txt = document.createElement("textarea");
	txt.innerHTML = snippet;
	return txt.value;
}

export {GenreEnum, AddSongForm, EnhancedComponent, Header, Image, Sidebar, TextInput, youtubeQuery, decodeHTML};
