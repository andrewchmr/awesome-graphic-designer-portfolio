import React from "react";
import './Header.scss';
import {Link} from "react-router-dom";

export const Header = () => {
    return <header className="header">
        <nav>
            <input className="header__menu-button" type="checkbox" id="menu-button"/>
            <label className="header__menu-icon" htmlFor="menu-button"><span/></label>
            <ul className="header__nav-sub">
                <Link className="header__logo" style={{zIndex: 1000}} to={'/'}/>
                <li className="header__tab header__tab--active"><Link to={'/work'}>Work</Link></li>
                <li className="header__tab"><Link to="/about">About</Link></li>
            </ul>
        </nav>
    </header>
};