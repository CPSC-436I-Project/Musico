import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";

class ImageButton extends Button<IImageButtonProps, IImageButtonState> {

    public static defaultProps: IImageButtonProps = {
        ...Button.defaultProps,
        width: 150,
        height: 30,
        src: "",
    };

    protected constructor(props: IImageButtonProps) {
        super(props);
        this.state = {
            ...this.state,
            pressed: false,
        };
    }

    public render(): ReactNode {
        return (
            <div className="image_button"
                 style={{
                     backgroundImage: `url(${this.props.src})`,
                     width: this.props.width,
                     height: this.props.height || 30
                 }}
            >
            </div>
        );
    }
}

export interface IImageButtonProps extends IButtonProps {
    src: string;
}

export interface IImageButtonState extends IButtonState {
}

export {ImageButton};
