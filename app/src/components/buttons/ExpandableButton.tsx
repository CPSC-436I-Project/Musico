import * as React from "react";
import {ReactNode} from "react";
import {Button, IButtonProps, IButtonState} from "./Button";
import {motion, Variants} from "framer-motion";
import "./Button.css";
import {ExpansionState} from "../";

class ExpandableButton extends Button<IExpandableButtonProps, IExpandableButtonState> {

	public static defaultProps: IExpandableButtonProps = {
		...Button.defaultProps,
		text: "",
		child: <div/>,
		fontColour: "#222",
	}

	private readonly buttonVariant: Variants = {
		expanded: () => ({
			height: "100%",
			width: "100%",
			transition: {
				when: "beforeChildren"
			}
		}),
		collapsed: () => ({
			height: "100%",
			width: "100%",
			transition: {
				when: "afterChildren"
			}
		})
	};

	protected constructor(props: IExpandableButtonProps) {
		super(props);
		this.state = {
			...this.state,
			text: this.props.text,
			expandState: ExpansionState.COLLAPSED,
			onAction: (callback: () => void) => {
				this.setState({
					expandState: this.state.expandState === ExpansionState.EXPANDED ? ExpansionState.COLLAPSED : ExpansionState.EXPANDED
				}, () => {
					this.props.onAction(callback);
				});
			}
		};
	}

	public render(): ReactNode {
		return (
			<motion.div
				initial={{
					height: "100%"
				}}
				animate={{
					height: "100%"
				}}
			>
				<p style={{color: this.props.fontColour}}>{this.state.text}</p>
				<motion.div
					initial={{height: 0, opacity: 0}}
					animate={{
						height: this.state.expandState === ExpansionState.EXPANDED ? "100%" : 0,
						opacity: this.state.expandState === ExpansionState.EXPANDED ? 1 : 0,
					}}
					transition={{
						duration: 0.5,
					}}
					onClick={(e) => e.stopPropagation()}
				>
					{this.state.expandState === ExpansionState.EXPANDED && this.props.child}
				</motion.div>
			</motion.div>
		);
	}
}

export interface IExpandableButtonProps extends IButtonProps {
	text?: string;
	fontColour?: string;
	child?: ReactNode;
}

export interface IExpandableButtonState extends IButtonState {
	text: string;
	expandState: ExpansionState;
}

export {ExpandableButton};
