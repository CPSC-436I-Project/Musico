import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {DebugScreen} from "./containers/TestScreens/DebugScreen";

// Set to true for production build
const prod: boolean = false;

ReactDOM.render(
  <React.StrictMode>
      {prod ? <App/> : <DebugScreen/>}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
