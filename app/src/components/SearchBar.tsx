import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
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

    // INHERITED FROM TEXTINPUT BUT COPIED HERE FOR REFERENCE:
    // protected constructor(props: ISearchBarProps) {
    //     super(props);
    //     this.state = {
    //         ...this.state,
    //     };
    //     this.updateText = this.updateText.bind(this);
    // }
    //
    // protected updateText(event: any): void {
    //     this.setState({
    //         ...this.state,
    //         text: event.target.value,
    //     });
    // }

    public render(): ReactNode {
        let input_width = 2 * this.props.colorMargin + 5;
        return (
            <div
                className="search_bar_div"
                style={{
                    backgroundColor: this.props.color,
                    outline: "none",
                    border: Number(this.props.border),
                    width: this.props.width,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                            marginLeft: 3,
                        }}
                    />
                </form>
            </div>
        );
    }
}

export interface ISearchBarProps extends ITextInputProps {
    // defaultText: string;
    // width?: number | string;
    // color?: string;
    // colorMargin?: number;
    // border?: boolean;
    // borderColor?: string;
    // fontSize?: number;
    // submit: (event: React.SyntheticEvent) => void;
}

export interface ISearchBarState extends ITextInputState {
    // text: string;
}

export {SearchBar};
