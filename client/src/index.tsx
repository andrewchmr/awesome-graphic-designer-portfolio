import React from 'react';
import ReactDOM from 'react-dom';
import './variables.scss';
import './index.scss';
import './fontello-66c86d21/css/fontello.css';
import App from './App';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

if (!isLocalhost && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/offline.js', {scope: '/'});
}

ReactDOM.render(<App/>, document.getElementById('root'));