import * as React from "react";
import {EnhancedComponent} from "./EnhancedComponent";
import {IEnhancedComponentProps, IEnhancedComponentState} from "./EnhancedComponent";
import {Image} from "./Image";
import thumbnailPlaceholder from "../icons/thumbnail-placeholder.jpeg"

class SongInfoContainer extends EnhancedComponent<ISongInfoContainerProps, ISongInfoContainerState> {
    public static defaultProps: ISongInfoContainerProps = {
        ...EnhancedComponent.defaultProps,
        color: "#ffffff",
    };

    protected constructor(props: ISongInfoContainerProps) {
        super(props);
    }

    public render() {
        const songDescription = "Song Name - Artist";
        return (
            <div className={"song-info-container"} style={{color: this.props.color}} >
                <Image
                    path={thumbnailPlaceholder}
                    name={"Album"}
                    width={132}
                    height={74}
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
