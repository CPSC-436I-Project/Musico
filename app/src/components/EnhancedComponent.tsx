import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import "./css/Components.css";

abstract class EnhancedComponent<P extends IEnhancedComponentProps = IEnhancedComponentProps,
    S extends IEnhancedComponentState = IEnhancedComponentState> extends React.PureComponent<P, S> {

    public static defaultProps: IEnhancedComponentProps = {
        parentStyle: {},
    };

    private readonly childRender: () => ReactNode;

    protected constructor(props: P) {
        super(props);
        // @ts-ignore
        this.state = {};
        this.childRender = this.render;
        this.wrapRender = this.wrapRender.bind(this);
        this.wrapRender();
    }

    /**
     * Wrap the render function of all child classes with the following node structure
     *
     * @private
     */
    private wrapRender(): void {
        this.render = (): ReactNode => {
            return (
                <div style={this.props.parentStyle}>
                    {this.childRender()}
                </div>
            );
        };
    }
}

export interface IEnhancedComponentProps {
    dispatch?: any;
    parentStyle?: CSSProperties;
}

export interface IEnhancedComponentState {
}

export {EnhancedComponent};
