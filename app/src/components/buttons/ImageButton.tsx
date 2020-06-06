import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class ImageButton extends Button<IImageButtonProps, IImageButtonState> {

    public static defaultProps: IImageButtonProps = {
        ...Button.defaultProps,
        width: 150,
        src: "",
    };

    protected constructor(props: IImageButtonProps) {
        super(props);
        this.state = {
            ...this.state,
            pressed: false,
            src: props.src,
        };
    }

    public render(): ReactNode {
        return (
            <div className="image_button"
                 style={{backgroundImage: `url(${this.state.src})`,
                        width: this.props.width,
                        height: this.props.height || 30}}>
            </div>
        );
    }
}

export interface IImageButtonProps extends IButtonProps {
    src: string;
}

export interface IImageButtonState extends IButtonState {
    src: string;
}

export {ImageButton};