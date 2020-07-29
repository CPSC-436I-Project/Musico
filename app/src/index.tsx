import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {DebugScreen} from "./containers";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./redux/reducers";
import initialStore from "./redux/initialStore";
import thunk from 'redux-thunk';

const prod: boolean = true;

declare global {	
    interface Window {	
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;	
    }	
  }

// @ts-ignore
ReactDOM.render(<React.StrictMode> <Provider store={createStore(reducers, initialStore, compose(applyMiddleware(thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()))}>
        {prod ? <App/> : <DebugScreen/>}
    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
