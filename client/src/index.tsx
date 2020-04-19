import React from 'react';
import ReactDOM from 'react-dom';
import './variables.scss';
import './index.scss';
import './fontello-66c86d21/css/fontello.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
