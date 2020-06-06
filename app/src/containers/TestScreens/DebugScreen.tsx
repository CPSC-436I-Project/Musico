import * as React from "react";
import {ReactNode} from "react";
import "../Container.css";
import {Container, IContainerProps, IContainerState} from "../Container";
import {testScreen, testScreenMap} from "./";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import {TextButton} from "../../components";

class DebugScreen extends Container<IDebugScreenProps, IDebugScreenState> {

	public static defaultProps: IDebugScreenProps = {
		...Container.defaultProps,
	};

	protected constructor(props: IDebugScreenProps) {
		super(props);
		this.state = {
			currentPage: testScreen.EmptyPage,
		};

		this.changePage = this.changePage.bind(this);
		this.createNavLinks = this.createNavLinks.bind(this);
		this.determinePage = this.determinePage.bind(this);
	}

	private changePage(page: any): () => void {
		const that: DebugScreen = this;
		return (): void => {
			that.setState({currentPage: page as testScreen});
		}
	}

	private createNavLinks(pageKey: any): ReactNode {
		return(
			<NavItem key={pageKey}>
				<NavLink
					onClick={this.changePage(pageKey)}
					href={"#"}
					selected={this.state.currentPage === pageKey}
				>
					<TextButton
						text={testScreenMap[pageKey].name}
					/>
				</NavLink>
			</NavItem>
		);
	}

	private determinePage(): ReactNode {
		const props: IContainerProps = {

		}

		return React.createElement(testScreenMap[this.state.currentPage].pointer, props);
	}

	public render(): ReactNode {
		const keys: string[] = Object.keys(testScreen)
			.filter((k) => typeof testScreen[k as any] === "number");
		const links: any[] = keys.map((k) => testScreen[k as any]);

		return (
			<div className={"flex-column-center"}>
				<Navbar
					expand={"md"}
				>
					<Nav navbar={true}>
						{links.map(this.createNavLinks)}
					</Nav>
				</Navbar>
				{this.determinePage()}
			</div>
		);
	}
}

export interface IDebugScreenProps extends IContainerProps {

}

export interface IDebugScreenState extends IContainerState {
	currentPage: testScreen;
}

export {DebugScreen};
