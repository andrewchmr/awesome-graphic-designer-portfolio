import React from "react";
import './Header.scss';

export const Header = () => {
    return <header className="header">
        <nav>
            <input className="header__menu-button" type="checkbox" id="menu-button"/>
            <label className="header__menu-icon" htmlFor="menu-button"><span/></label>
            <ul className="header__nav-sub">
                <a className="header__logo" style={{zIndex: 1000}} href="#"/>
                <li className="header__tab header__tab--active"><a href="#work">Work</a></li>
                <li className="header__tab"><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
};