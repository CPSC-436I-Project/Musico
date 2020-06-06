import * as React from "react";
import { SidebarTextImageButton } from "./buttons/SidebarTextImageButton";
import "./buttons/Button.css";
import "./Sidebar.scss";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {TextInput} from "./TextInput";

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

    protected constructor(props: ISidebarProps) {
        super(props);
        this.state = {
            searchValue: "",
            genre: "",
            icon: "",
        };
    }

    private onSearch(event: React.SyntheticEvent) {
        let target = event.currentTarget as HTMLInputElement;
        let value = target.value;
        this.setState({
            searchValue: value
        });
    }

    public render() {
        let placeholder = "Search...";
        return (
            <div className="sidebar">
                <div className="sidebar-search-wrapper">
                    <TextInput
                        defaultText={placeholder}
                    />
                    <hr />
                </div>
                <div className="sidebar-channels">
                    {this.musicGenres.map(item =>
                        <SidebarTextImageButton
                            key={item.genre}
                            text={item.genre}
                            icon={item.icon}
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

export interface ISidebarProps extends IEnhancedComponentProps{
    className?: string;
    hasSearch?: boolean;
}

export interface ISidebarState extends IEnhancedComponentState {
    searchValue?: string;
    genre: string;
    icon: string;
}

export {Sidebar};
