import React from 'react';
import ReactDOM from 'react-dom';
import './variables.scss';
import './index.scss';
import './fontello-66c86d21/css/fontello.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
