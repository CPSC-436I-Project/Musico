import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";

class GenericScreen extends Container<IGenericScreenProps, IGenericScreenState> {

    public static defaultProps: IGenericScreenProps = {};

    protected constructor(props: IGenericScreenProps) {
        super(props);
    }


    public render(): ReactNode {
        return <div> ADD STUFF TO THIS PAGE </div>
    }
}

export interface IGenericScreenProps extends IContainerProps {

}

export interface IGenericScreenState extends IContainerState {
}

export {GenericScreen};
