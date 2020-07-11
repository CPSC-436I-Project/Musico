import * as React from "react";
import {SidebarTextImageButton} from "./buttons/SidebarTextImageButton";
import "./buttons/Button.css";
import "./Sidebar.scss";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {SearchBar} from "./SearchBar";
import {IStore} from "../redux/initialStore";
import {setSelectedGenre} from "../redux/actions";
import {connect} from "react-redux";
import {GenreEnum} from "./";

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

    public static mapStateToProps:(state: IStore, props: ISidebarProps) => ISidebarProps = (state: IStore, props: ISidebarProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
        };
    }

    protected constructor(props: ISidebarProps) {
        super(props);
        this.state = {
            selectedGenre: null,
            shownGenres: this.musicGenres,
        };
        this.onSearch = this.onSearch.bind(this);
        this.sidebarButtonClicked = this.sidebarButtonClicked.bind(this);
    }

    private onSearch(searchValue: string) {
        let currShownGenres: ISidebarGenreChannel[] = [];
        for (const currGenre of this.musicGenres) {
            if (currGenre.genre.toLowerCase().includes(searchValue.toLowerCase())) {
                currShownGenres.push(currGenre);
            }
        }
        this.setState({
            shownGenres: currShownGenres,
        });
    }

    private sidebarButtonClicked(genre: GenreEnum): () => void {
        return () => {
            this.props.dispatch(setSelectedGenre(genre));
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
                            onAction={this.sidebarButtonClicked(item.genre)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

interface ISidebarGenreChannel {
    genre: GenreEnum;
    icon: string;
}

export interface ISidebarProps extends IEnhancedComponentProps {
    className?: string;
    hasSearch?: boolean;
    selectedGenre?: GenreEnum | null;
}

export interface ISidebarState extends IEnhancedComponentState {
    selectedGenre: GenreEnum | null;
    shownGenres: ISidebarGenreChannel[];
}

// @ts-ignore
export default connect(Sidebar.mapStateToProps)(Sidebar);

