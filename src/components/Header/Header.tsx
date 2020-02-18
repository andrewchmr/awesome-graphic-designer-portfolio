import React from "react";
import './Header.scss';
import {NavLink} from "react-router-dom";

export const Header = () => {
    return <header className="Header">
        <nav>
            <input className="Header__menu-button" type="checkbox" id="menu-button"/>
            <label className="Header__menu-icon" htmlFor="menu-button"><span/></label>
            <ul className="Header__nav-sub">
                <li><NavLink className="Header__logo" to={'/'}/></li>
                <li className={'Header__tab'}>
                    <NavLink exact to={'/'}
                             className={'Header__link'}
                             activeClassName="Header__link--active">Work</NavLink>
                </li>
                <li className={'Header__tab'}>
                    <NavLink to="/about"
                             className={'Header__link'}
                             activeClassName="Header__link--active">About</NavLink>
                </li>
            </ul>
        </nav>
    </header>
};