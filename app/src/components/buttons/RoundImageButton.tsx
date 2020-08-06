import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import "./Button.css";
import {Image} from "../";

class RoundImageButton extends Button<IRoundImageButtonProps, IRoundImageButtonState> {

    public static defaultProps: IRoundImageButtonProps = {
        ...Button.defaultProps,
        height: 40,
        width: 40,
        src: "",
        buttonColour: "transparent",
        buttonFocusedColour: "transparent",
    };

    protected constructor(props: IRoundImageButtonProps) {
        super(props);
        this.state = {
            ...this.state,
            pressed: false,
        };
    }

    public render(): ReactNode {
        return (
            <Image
                path={this.props.src}
                width={this.props.width}
                height={this.props.height}
                rounded={true}
            />
        );
    }
}

export interface IRoundImageButtonProps extends IButtonProps {
    src: string;
}

export interface IRoundImageButtonState extends IButtonState {
}

export {RoundImageButton};
