import React from 'react';
import './App.css';
import {Dashboard, LoginScreen} from "./";
import {ReactNode} from "react";
import { IStore } from 'src/redux/initialStore';
import { getCookie } from 'src/utility/cookies';
import { autoLoginUser } from 'src/redux/actions/userActions';
import {connect} from "react-redux";

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
			isLoggedOut: true
		}
	}

	whenLoginFails = () => {
		this.setState({isLoggedOut: true})
	}

	userIsSet = () => {
		this.setState({isLoggedOut: false})
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
				{this.state.isLoggedOut ? <LoginScreen/> : <Dashboard/>}
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
}

// @ts-ignore
export default connect(App.mapStateToProps)(App);
