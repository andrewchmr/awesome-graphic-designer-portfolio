import {Link} from "react-router-dom";
import * as React from "react";
import './CloseButton.scss';

export const CloseButton = ({goToPath}: { goToPath: string }) => {
    return <Link to={goToPath}>
        <div className="CloseButton">
            <div className="CloseButton__left-right-arrow"/>
            <div className="CloseButton__right-left-arrow"/>
        </div>
    </Link>
};