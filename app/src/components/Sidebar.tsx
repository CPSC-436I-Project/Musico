import * as React from "react";
import { SidebarTextImageButton } from "./buttons/SidebarTextImageButton";
import "./buttons/SidebarTextImageButton.css";
import "./Sidebar.scss";

const musicGenres = [
    {genre: "Electronic", icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png"},
    {genre: "Rock", icon: "https://img.icons8.com/ios-glyphs/30/000000/rock-music.png"},
    {genre: "Lo-Fi", icon: "https://img.icons8.com/ios-glyphs/30/000000/easy-listening.png"},
    {genre: "Reggae", icon: "https://img.icons8.com/ios-glyphs/30/000000/reggae.png"},
    {genre: "Country", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
    {genre: "Hip-Hop", icon: "https://img.icons8.com/ios-glyphs/30/000000/hip-hop-music.png"},
    {genre: "Jazz", icon: "https://img.icons8.com/ios-glyphs/30/000000/saxophone.png"},
    {genre: "Rap", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"}
  ]

interface SidebarGenreChannel {
    genre: string;
    icon: string;
    href?: string;
}

interface SidebarProps<T extends SidebarGenreChannel> {
    className?: string;
    hasSearch?: boolean;
}

interface SidebarState {
    searchValue?: string;
    genre: "";
    icon: "";
}

class Sidebar<T extends SidebarGenreChannel> extends React.Component<SidebarProps<T>, SidebarState> {

    constructor(props: SidebarProps<T>) {
        super(props);
        this.state = {
            searchValue: "",
            genre: "",
            icon: ""
        };
    }

    private onSearch(event: React.SyntheticEvent) {
        let target = event.currentTarget as HTMLInputElement;
        let value = target.value;
        this.setState({
            searchValue: value
        });
    }

    render() {
        let placeholder = "Search...";
        return (
            <div className="sidebar">
                <div className="sidebar-search-wrapper">
                    <input 
                        type="text"
                        placeholder={placeholder}
                        className="search-bar"
                        value={this.state.searchValue}
                        onChange={this.onSearch}
                    />
                    <hr />
                </div>   
                <div className="sidebar-channels">  
                    {musicGenres.map(item => 
                        <SidebarTextImageButton key={item.genre} genre={item.genre} icon={item.icon}/> 
                    )}
                </div>
            </div>
        )
    }
}

export default Sidebar;

