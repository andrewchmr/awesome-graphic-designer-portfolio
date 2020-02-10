import {Link} from "react-router-dom";
import * as React from "react";
import './CloseButton.scss';

export const CloseButton = () => {
    return <Link to={'/'}>
        <div className="CloseButton">
            <div className="CloseButton__left-right-arrow"/>
            <div className="CloseButton__right-left-arrow"/>
        </div>
    </Link>
};