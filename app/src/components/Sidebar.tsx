import * as React from "react";
import {SidebarTextImageButton} from "./buttons/SidebarTextImageButton";
import "./buttons/Button.css";
import "./Sidebar.scss";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {SearchBar} from "./SearchBar";

class Sidebar extends EnhancedComponent<ISidebarProps, ISidebarState> {
    public static defaultProps: ISidebarProps = {
        ...EnhancedComponent.defaultProps,
    };

    private readonly musicGenres: ISidebarGenreChannel[] = [
        {genre: "Electronic", icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png"},
        {genre: "Rock", icon: "https://img.icons8.com/ios-glyphs/30/000000/rock-music.png"},
        {genre: "Lo-Fi", icon: "https://img.icons8.com/ios-glyphs/30/000000/easy-listening.png"},
        {genre: "Reggae", icon: "https://img.icons8.com/ios-glyphs/30/000000/reggae.png"},
        {genre: "Country", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
        {genre: "Hip-Hop", icon: "https://img.icons8.com/ios-glyphs/30/000000/hip-hop-music.png"},
        {genre: "Jazz", icon: "https://img.icons8.com/ios-glyphs/30/000000/saxophone.png"},
        {genre: "Rap", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
    ]
    private search: React.RefObject<SearchBar>;

    protected constructor(props: ISidebarProps) {
        super(props);
        this.search = React.createRef();
        this.state = {
            genre: "",
            icon: "",
            shownGenres: [
                {genre: "Electronic", icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png"},
                {genre: "Rock", icon: "https://img.icons8.com/ios-glyphs/30/000000/rock-music.png"},
                {genre: "Lo-Fi", icon: "https://img.icons8.com/ios-glyphs/30/000000/easy-listening.png"},
                {genre: "Reggae", icon: "https://img.icons8.com/ios-glyphs/30/000000/reggae.png"},
                {genre: "Country", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
                {genre: "Hip-Hop", icon: "https://img.icons8.com/ios-glyphs/30/000000/hip-hop-music.png"},
                {genre: "Jazz", icon: "https://img.icons8.com/ios-glyphs/30/000000/saxophone.png"},
                {genre: "Rap", icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
            ],
        };
        this.onSearch = this.onSearch.bind(this);
    }

    private onSearch() {

        let currShownGenres: ISidebarGenreChannel[] = [];

        // console.log("this = " + this);
        // console.log("this.search = " + this.search);
        // console.log("this.search.current = " + this.search.current);
        // console.log("this.search.current.getText() + " + this.search.current.getText());

        let searchValue = this.search.current.getText();
        if (searchValue !== "") {
            for (let i: number = 0; i < this.musicGenres.length; i++) {
                if (this.musicGenres[i].genre.toLowerCase().includes(searchValue.toLowerCase())) {
                    currShownGenres.push(this.musicGenres[i]);
                }
            }
            this.setState({
                ...this.state,
                shownGenres: currShownGenres,
            });
        } else {
            console.log("resetting");
            this.setState({
                ...this.state,
                shownGenres: this.musicGenres,
            })
        }
    }

    public render() {
        let placeholder = "Search...";
        return (
            <div className="sidebar">
                <div className="sidebar-search-wrapper">
                    <SearchBar
                        defaultText={placeholder}
                        submit={this.onSearch}
                        ref={this.search}
                    />
                    <hr/>
                </div>
                <div className="sidebar-channels">
                    {this.state.shownGenres.map(item =>
                        <SidebarTextImageButton
                            key={item.genre}
                            text={item.genre}
                            icon={item.icon}
                            buttonColour="#E1E1E2"
                            onAction={(callback: () => void) => {
                                console.log("Clicked on " + item.genre);
                                callback();
                            }}
                        />
                    )}
                </div>
            </div>
        )
    }
}

interface ISidebarGenreChannel {
    genre: string;
    icon: string;
}

export interface ISidebarProps extends IEnhancedComponentProps {
    className?: string;
    hasSearch?: boolean;
}

export interface ISidebarState extends IEnhancedComponentState {
    genre: string;
    icon: string;
    shownGenres: ISidebarGenreChannel[];
}

export {Sidebar};