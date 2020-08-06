import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import "./css/Sidebar.css";
import searchIcon from "../icons/search.png";
import {ITextInputProps, ITextInputState, TextInput} from "./TextInput";
import {Image} from "./Image";

class SearchBar extends TextInput {

    public static defaultProps: ISearchBarProps = {
        ...EnhancedComponent.defaultProps,
        defaultText: "",
        width: "100%",
        color: "transparent",
        colorMargin: 0,
        border: false,
        borderColor: "black",
        fontSize: 18,
        onEnterDisabled: false,
        submit: () => {
        },
    };

    public render(): ReactNode {
        let input_width = 2 * this.props.colorMargin + 5;
        return (
            <div
                className="search-bar-div"
                style={{
                    backgroundColor: this.props.color,
                    border: Number(this.props.border),
                    width: this.props.width,
                }}
            >
                <Image width={22} height={22} path={searchIcon}/>
                <input
                    className="search-input"
                    type="text"
                    name="search_input"
                    placeholder={this.props.defaultText}
                    value={this.state.text}
                    onChange={this.updateText}
                    style={{
                        margin: this.props.colorMargin,
                        width: `calc(100% - ${input_width}px)`,
                        fontSize: this.props.fontSize,
                    }}
                />
            </div>
        );
    }
}

export interface ISearchBarProps extends ITextInputProps {
}

export interface ISearchBarState extends ITextInputState {
}

export {SearchBar};
