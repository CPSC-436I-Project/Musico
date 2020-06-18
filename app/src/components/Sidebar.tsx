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
        {genre: GenreEnum.ELECTRONIC, icon: "https://img.icons8.com/ios-glyphs/30/000000/electronic-music.png"},
        {genre: GenreEnum.ROCK, icon: "https://img.icons8.com/ios-glyphs/30/000000/rock-music.png"},
        {genre: GenreEnum.LO_FI, icon: "https://img.icons8.com/ios-glyphs/30/000000/easy-listening.png"},
        {genre: GenreEnum.REGGAE, icon: "https://img.icons8.com/ios-glyphs/30/000000/reggae.png"},
        {genre: GenreEnum.COUNTRY, icon: "https://img.icons8.com/ios-glyphs/30/000000/country-music.png"},
        {genre: GenreEnum.HIP_HOP, icon: "https://img.icons8.com/ios-glyphs/30/000000/hip-hop-music.png"},
        {genre: GenreEnum.JAZZ, icon: "https://img.icons8.com/ios-glyphs/30/000000/saxophone.png"},
        {genre: GenreEnum.RAP, icon: "https://img.icons8.com/ios-glyphs/30/000000/rap.png"},
    ]

    private readonly search: React.RefObject<SearchBar>;

    protected constructor(props: ISidebarProps) {
        super(props);
        this.search = React.createRef();
        this.state = {
            selectedGenre: null,
            shownGenres: this.musicGenres,
        };
        this.onSearch = this.onSearch.bind(this);
    }

    private onSearch(event?: React.SyntheticEvent) {
        if (event !== undefined) {
            event.preventDefault();
        }
        let currShownGenres: ISidebarGenreChannel[] = [];
        let searchValue = this.search.current.getText();
        for (const currGenre of this.musicGenres) {
            if (currGenre.genre.toLowerCase().includes(searchValue.toLowerCase())) {
                currShownGenres.push(currGenre);
            }
        }
        this.setState({
            shownGenres: currShownGenres,
        });
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

interface ISidebarGenreChannel {
    genre: GenreEnum;
    icon: string;
}

export interface ISidebarProps extends IEnhancedComponentProps {
    className?: string;
    hasSearch?: boolean;
}

export interface ISidebarState extends IEnhancedComponentState {
    selectedGenre: GenreEnum | null;
    shownGenres: ISidebarGenreChannel[];
}

export {Sidebar};
