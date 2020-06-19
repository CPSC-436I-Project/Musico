import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import "./Components.css";
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
        submit: () => {},
    };

    public render(): ReactNode {
        let input_width = 2 * this.props.colorMargin + 5;
        return (
            <div
                className="search_bar_div"
                style={{
                    backgroundColor: this.props.color,
                    border: Number(this.props.border),
                    width: this.props.width,
                }}
            >
                <Image path={"https://img.icons8.com/ios-filled/25/000000/search.png"}/>
                <form onSubmit={this.props.submit}>
                    <input
                        className="search_input"
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
                </form>
            </div>
        );
    }
}

export interface ISearchBarProps extends ITextInputProps {
}

export interface ISearchBarState extends ITextInputState {
}

export {SearchBar};
