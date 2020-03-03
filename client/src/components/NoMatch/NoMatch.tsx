import React from "react";
import './NoMatch.scss';
import {Link} from "react-router-dom";

const NoMatch = () => {
    return <div className={'NoMatch'}>
        <p>Sorry, that page cannot be found</p>
        <p>Try going <Link to={'/'} className={'NoMatch__link-home'}>here</Link> instead, thanks.</p>
    </div>
};

export default NoMatch;