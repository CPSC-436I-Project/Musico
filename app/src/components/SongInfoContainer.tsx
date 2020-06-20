import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import "./SongInfoContainer.css";
import {Image} from "./Image";

class SongInfoContainer extends EnhancedComponent<ISongInfoContainerProps, ISongInfoContainerState> {
    public static defaultProps: ISongInfoContainerProps = {
        ...EnhancedComponent.defaultProps,
        color: "#ffffff",
    };

    protected constructor(props: ISongInfoContainerProps) {
        super(props);
    }

    public render() {
        const albumPicture = "https://image.shutterstock.com/image-vector/minimal-abstract-black-sphere-design-600w-158384345.jpg";
        const songDescription = "Song Name - Artist";
        return (
            <div className={"song-info-container"} style={{color: this.props.color}} >
                <Image
                    path={albumPicture}
                    name={"Album"}
                    width={this.props.width}
                    height={this.props.height}
                />
                <p className={"song-description"}>{songDescription}</p>
            </div>
        )
    }
}

export interface ISongInfoContainerProps extends IEnhancedComponentProps {
    color?: string,
    width?: number,
    height?: number
}

export interface ISongInfoContainerState extends IEnhancedComponentState {

}

export {SongInfoContainer};
