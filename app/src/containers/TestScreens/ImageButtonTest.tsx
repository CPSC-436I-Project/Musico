import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {ImageButton} from "../../components/buttons/ImageButton";
import logo from "../../logo.svg";

class ImageButtonTest extends Container<IImageButtonTestProps, IImageButtonTestState> {

    public static defaultProps: IImageButtonTestProps = {};

    protected constructor(props: IImageButtonTestProps) {
        super(props);
        this.state = {};

    }

    private static imageButtonCallback(callback: () => void): void {
        console.log("Image Button clicked");
        callback();
    }

    public render(): ReactNode {
        return (
            <div>
                <h2>Image Buttons</h2>
                <ImageButton
                    src={logo}
                    onAction={ImageButtonTest.imageButtonCallback}
                />
                <ImageButton
                    src={logo}
                    width={200}
                />
                <ImageButton
                    src={logo}
                    height={110}
                />
                <ImageButton
                    src={logo}
                    width={250}
                    height={100}
                />
            </div>
        );
    }
}

export interface IImageButtonTestProps extends IContainerProps {

}

export interface IImageButtonTestState extends IContainerState {

}

export {ImageButtonTest};
