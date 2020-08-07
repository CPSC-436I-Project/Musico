import React, {ReactNode} from 'react';
import './App.css';
import {PageEnum, pageMap} from "./";
import {IStore} from 'src/redux/initialStore';
import {getCookie} from 'src/utility/cookies';
import {autoLoginUser} from 'src/redux/actions/userActions';
import {connect} from "react-redux";
import {IContainerProps} from "./Container";
import {setSelectedGenre} from "../redux/actions";

class App<P extends IAppProps, S extends IAppState = IAppState> extends React.Component<P, S> {

    public static defaultProps: IAppProps = {};

    public static mapStateToProps: (state: IStore, props: any) => IAppProps = (state: IStore, props: any) => {
        return {
            ...props,
            userId: state.userStore.userId
        };
    };

    protected constructor(props: P) {
        super(props);
        // @ts-ignore
        this.state = {
            isLoggedOut: true,
            currentPage: PageEnum.LoginScreen,
        };
        this.changePage = this.changePage.bind(this);
        this.determinePage = this.determinePage.bind(this);
    }

    /**
     * Change the page that is currently rendered on screen
     *
     * @param page {PageEnum} - The page to go to
     * @private
     */
    private changePage(page: PageEnum): void {
        if (page !== PageEnum.Room) {
            this.props.dispatch(setSelectedGenre(null));
        }
        this.setState({currentPage: page});
    }

    /**
     * Render the currently selected page
     * @private
     */
    private determinePage(): ReactNode {
        const props: IContainerProps = {
            ...pageMap[this.state.currentPage].props,
            changePage: this.changePage,
        };
        return React.createElement(pageMap[this.state.currentPage].pointer, props);
    }

    /**
     * Callback for when login fails
     */
    whenLoginFails = () => {
        this.setState({isLoggedOut: true})
    };

    /**
     * User is valid. Go to the Dashboard.
     */
    userIsSet = () => {
        this.setState({isLoggedOut: false, currentPage: PageEnum.Dashboard})
    };

    /**
     * Check if cookie exists. If yes, then auto-login the user.
     * Otherwise render the Login Page.
     */
    componentDidMount = () => {
        if (this.props.userId !== null) {
            this.userIsSet();
        }
        let cookie = getCookie('auth-token');
        if (cookie !== "") {
            this.props.dispatch(autoLoginUser(this.whenLoginFails));
        }
    };

    /**
     * If the user is set after updating the app layer, log them in.
     */
    componentDidUpdate = () => {
        if (this.props.userId !== null && this.state.isLoggedOut) {
            this.userIsSet();
        }
    };

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
