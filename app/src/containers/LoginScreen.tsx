import * as React from "react";
import {ReactNode} from "react";
import "./Container.css";
import {Container, IContainerProps, IContainerState} from "./Container";
import {ExpandableButton, TextButton, TextInput} from "../components";
import {connect} from "react-redux";
import {IStore} from "../redux/initialStore";
import {createUser, loginUser} from "../redux/actions";
import {PageEnum} from "./index";
import {getCookie} from "../utility/cookies";
import {autoLoginUser} from "../redux/actions/userActions";

class LoginScreen extends Container<ILoginScreenProps, ILoginScreenState> {

    public static mapStateToProps: (state: IStore, props: any) => ILoginScreenProps = (state: IStore, props: any) => {
        return {
            ...props,
            userId: state.userStore.userId,
            username: state.userStore.username,
            email: state.userStore.email,
        };
    };

    private loginUserNameTextRef: TextInput;
    private loginPasswordTextRef: TextInput;
    private signUpUserNameTextRef: TextInput;
    private signUpPasswordTextRef: TextInput;
    private signUpEmailTextRef: TextInput;

    protected constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: "",
        };
        this.loginButtonOnClick = this.loginButtonOnClick.bind(this);
        this.signUpButtonOnClick = this.signUpButtonOnClick.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    private displayError(message: string) {
        this.setState({errorMessage: message});
    }

    private loginButtonOnClick(callback: () => void): void {
        this.props.dispatch(loginUser(this.loginUserNameTextRef.getText(), this.loginPasswordTextRef.getText(), this.displayError));
        callback();
    }

    private signUpButtonOnClick(callback: () => void): void {
        this.props.dispatch(createUser(this.signUpUserNameTextRef.getText(), this.signUpEmailTextRef.getText(), this.signUpPasswordTextRef.getText(), this.displayError));
        callback();
    }


    whenLoginFails = () => {
        // do nothing
    };

    /**
     * Go to Dashboard
     */
    userIsSet = () => {
        this.props.changePage(PageEnum.Dashboard);
    };

    componentDidMount = () => {
        if (this.props.userId !== null) {
            this.userIsSet();
        }
        let cookie = getCookie('auth-token');
        if (cookie !== "") {
            this.props.dispatch(autoLoginUser(this.whenLoginFails));
        }
    };

    componentDidUpdate = () => {
        if (this.props.userId) {
            this.userIsSet();
        }
    };

    public render(): ReactNode {
        const loginButtonChild: ReactNode = <div className={"flex-column-center"}>
            <TextInput
                defaultText={"email"}
                ref={(ref: TextInput) => {
                    this.loginUserNameTextRef = ref;
                }}
                parentStyle={{marginTop: 5, marginBottom: 5}}
            />
            <TextInput
                defaultText={"password"}
                ref={(ref: TextInput) => {
                    this.loginPasswordTextRef = ref;
                }}
                textType={"password"}
                parentStyle={{marginTop: 5, marginBottom: 5}}
            />
            <TextButton text={"Log In"} width={100} buttonColour={"#ffffff"} fontColour={"#181818"}
                        onAction={this.loginButtonOnClick}/>
        </div>;

        const signUpButtonChild: ReactNode = <div className={"flex-column-center"}>
            <TextInput
                defaultText={"email"}
                ref={(ref: TextInput) => {
                    this.signUpEmailTextRef = ref;
                }}
                parentStyle={{marginTop: 5, marginBottom: 5}}
            />
            <TextInput
                defaultText={"username"}
                ref={(ref: TextInput) => {
                    this.signUpUserNameTextRef = ref;
                }}
                parentStyle={{marginTop: 5, marginBottom: 5}}
            />
            <TextInput
                defaultText={"password"}
                ref={(ref: TextInput) => {
                    this.signUpPasswordTextRef = ref;
                }}
                parentStyle={{marginTop: 5, marginBottom: 5}}
                textType={"password"}
            />
            <TextButton text={"Sign Up"} width={100} buttonColour={"#6236ff"} fontColour={"#ffffff"}
                        onAction={this.signUpButtonOnClick}/>
        </div>;

        return (
            <div
                className={"login-screen fill-container center-mid"}
            >
                <div style={{
                    marginBottom: 15,
                    marginRight: 100
                }}>
                    <img src={"/musico.svg"} alt="Logo" width={800} height={400}/>
                </div>
                <div className={"flex-column-center"}>
                    <ExpandableButton
                        buttonColour={"#6236ff"}
                        buttonHoverColour={"#6236ff"}
                        fontColour={"#ffffff"}
                        text={"Login"}
                        width={350}
                        child={loginButtonChild}
                    />
                    <div style={{height: 10}}/>
                    <ExpandableButton
                        buttonColour={"#ffffff"}
                        buttonHoverColour={"#ffffff"}
                        text={"Sign Up"}
                        width={350}
                        child={signUpButtonChild}
                    />
                </div>
                <div className="error-message flex-column-center">
                    {this.state.errorMessage}
                </div>
            </div>
        );
    }
}

export interface ILoginScreenProps extends IContainerProps {
    username?: string | null;
    email?: string | null;
    userId?: string | null;
}

export interface ILoginScreenState extends IContainerState {
    errorMessage: string;
}

// @ts-ignore
export default connect(LoginScreen.mapStateToProps)(LoginScreen);
