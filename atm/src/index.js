import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createHistory from 'history/createBrowserHistory';

import { initFirebase } from './Firebase/initialization';

export const firebase = initFirebase();
export const database = firebase.database();
export const history = createHistory();

ReactDOM.render(<App 
        history={history} 
    />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
