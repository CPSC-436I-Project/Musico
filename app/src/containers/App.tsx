import React, {ReactNode} from 'react';
import './App.css';
import {Dashboard, LoginScreen, PageEnum, pageMap} from "./";
import {IStore} from 'src/redux/initialStore';
import {getCookie} from 'src/utility/cookies';
import {autoLoginUser} from 'src/redux/actions/userActions';
import {connect} from "react-redux";
import {IContainerProps} from "./Container";

class App<P extends IAppProps, S extends IAppState = IAppState> extends React.Component<P, S>{

	public static defaultProps: IAppProps = {
		/* any default props to all popups here */
	};

	public static mapStateToProps: (state: IStore, props: any) => IAppProps = (state: IStore, props: any) => {
		return {
			...props,
			userId: state.userStore.userId
		};
	}

	protected constructor(props: P) {
		super(props);
		// @ts-ignore
		this.state = {
			isLoggedOut: true,
			currentPage: PageEnum.LoginScreen,
		}

		this.changePage = this.changePage.bind(this);
		this.determinePage = this.determinePage.bind(this);
	}

	private changePage(page: PageEnum): void {
		this.setState({currentPage: page});
	}

	private determinePage(): ReactNode {
		const props: IContainerProps = {
			changePage: this.changePage,
		};

		return React.createElement(pageMap[this.state.currentPage].pointer, props);
	}

	whenLoginFails = () => {
		this.setState({isLoggedOut: true})
	}

	userIsSet = () => {
		this.setState({isLoggedOut: false, currentPage: PageEnum.Dashboard})
	}

	componentDidMount = () => {
		if (this.props.userId !== null) {
			this.userIsSet();
		}
		let cookie = getCookie('auth-token');
		if (cookie !== "") {
			this.props.dispatch(autoLoginUser(this.whenLoginFails));
		}
	}

	componentDidUpdate = () => {
		if (this.props.userId !== null && this.state.isLoggedOut === true) {
			this.userIsSet();
		}
	}

	public render(): ReactNode {
		return (
			<div className="App">
				{this.determinePage()}
			</div>
		);
	}

}

export interface IAppProps {
	dispatch?: any;
	userId?: string | null;
}

export interface IAppState {
	isLoggedOut: boolean;
	currentPage: PageEnum;
}

// @ts-ignore
export default connect(App.mapStateToProps)(App);
