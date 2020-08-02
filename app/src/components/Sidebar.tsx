import * as React from "react";
import {SidebarTextImageButton} from "./buttons/SidebarTextImageButton";
import "./buttons/Button.css";
import "./css/Sidebar.css";
import {asianIcon, bluesIcon, childrenIcon, christianIcon, electronicIcon, latinAmericanIcon, rockIcon, reggaeIcon, countryIcon, hiphopIcon, jazzIcon, classicalIcon, popIcon, soulIcon} from "../icons/genres";
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

    private musicGenres: ISidebarGenreChannel[] = [
        {genre: GenreEnum.ASIAN, icon: asianIcon, liked: false},
        {genre: GenreEnum.BLUES, icon: bluesIcon, liked: false},
        {genre: GenreEnum.CHILDREN, icon: childrenIcon, liked: false},
        {genre: GenreEnum.CHRISTIAN, icon: christianIcon, liked: false},
        {genre: GenreEnum.CLASSICAL, icon: classicalIcon, liked: false},
        {genre: GenreEnum.COUNTRY, icon: countryIcon, liked: false},
        {genre: GenreEnum.ELECTRONIC, icon: electronicIcon, liked: false},
        {genre: GenreEnum.HIP_HOP, icon: hiphopIcon, liked: false},
        {genre: GenreEnum.INDEPENDENT, icon: bluesIcon, liked: false},
        {genre: GenreEnum.JAZZ, icon: jazzIcon, liked: false},
        {genre: GenreEnum.LATIN_AMERICAN, icon: latinAmericanIcon, liked: false},
        {genre: GenreEnum.OTHER, icon: bluesIcon, liked: false},
        {genre: GenreEnum.POP, icon: popIcon, liked: false},
        {genre: GenreEnum.REGGAE, icon: reggaeIcon, liked: false},
        {genre: GenreEnum.ROCK, icon: rockIcon, liked: false},
        {genre: GenreEnum.SOUL, icon: soulIcon, liked: false},
    ];

    public static mapStateToProps:(state: IStore, props: ISidebarProps) => ISidebarProps = (state: IStore, props: ISidebarProps) => {
        return {
            ...props,
            selectedGenre: state.chatRoomStore.selectedGenre,
        };
    };

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

    private sidebarButtonClicked(genre: GenreEnum): (callback: () => void) => void {
        return (callback: () => void): void => {
            this.props.dispatch(setSelectedGenre(genre));
            callback();
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
                            onTextAction={this.sidebarButtonClicked(item.genre)}
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
    liked: boolean;
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

