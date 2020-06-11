import * as React from "react";
import {ReactNode} from "react";
import {EnhancedComponent, IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./Components.css";
import {TextInput} from "./TextInput";
import {Image} from "./Image";

class SearchBar extends TextInput {

    public static defaultProps: ISearchBarProps = {
        ...EnhancedComponent.defaultProps,
        defaultText: "",
        width: "50%",
        color: "transparent",
        colorMargin: 0,
        border: false,
        borderColor: "black",
        fontSize: 16,
    };

    protected constructor(props: ISearchBarProps) {
        super(props);
        this.state = {
            ...this.state,
        };
        this.updateText = this.updateText.bind(this);
    }

    // private updateText(event: any): void {
    //     this.setState({
    //         ...this.state,
    //         text: event.target.value,
    //     });
    // }

    public render(): ReactNode {
        return (
            <div
                className="search_bar_div"
                style={{
                    // backgroundColor: this.props.color,
                    backgroundColor: "red",
                    outline: "none",
                    border: Number(this.props.border),
                    width: this.props.width,
                    display: "flex",
                    flexGrow: 1,
                }}
            >
                <Image path={"https://img.icons8.com/ios-filled/30/000000/search.png"}/>
                <input
                    className="text_input"
                    type="text"
                    name="text_input"
                    placeholder={this.props.defaultText}
                    value={this.state.text}
                    onChange={this.updateText}
                    style={{
                        flexGrow: 1,
                        // margin: this.props.colorMargin,
                        margin: 5,
                        fontSize: this.props.fontSize,
                    }}
                />
            </div>
        );
    }
}

export interface ISearchBarProps extends IEnhancedComponentProps {
    defaultText: string;
    width?: number | string;
    color?: string;
    colorMargin?: number;
    border?: boolean;
    borderColor?: string;
    fontSize?: number;
}

export interface ISearchBarState extends IEnhancedComponentState {
    text: string;
}

export {SearchBar};
