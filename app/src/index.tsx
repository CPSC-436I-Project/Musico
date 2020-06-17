import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {DebugScreen} from "./containers";
import {createStore} from "redux";
import reducers from "./redux/reducers";
import initialStore from "./redux/initialStore";

const prod: boolean = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers, initialStore)}>
      {prod ? <App/> : <DebugScreen/>}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
