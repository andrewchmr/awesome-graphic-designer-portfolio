import React, {useState} from "react";
import './Header.scss';
import {Link} from "react-router-dom";

enum Tab {
    WORK,
    ABOUT
}

export const Header = () => {
    const [activeTab, setActiveTab] = useState(Tab.WORK);

    const getClassNameForTab = (tab: Tab): string => {
        return `header__tab ${activeTab === tab && 'header__tab--active'}`;
    };

    return <header className="header">
        <nav>
            <input className="header__menu-button" type="checkbox" id="menu-button"/>
            <label className="header__menu-icon" htmlFor="menu-button"><span/></label>
            <ul className="header__nav-sub">
                <Link onClick={() => setActiveTab(Tab.WORK)} className="header__logo" style={{zIndex: 1000}}
                      to={'/'}/>
                <li className={getClassNameForTab(Tab.WORK)}>
                    <Link onClick={() => setActiveTab(Tab.WORK)} to={'/'}>Work</Link>
                </li>
                <li className={getClassNameForTab(Tab.ABOUT)}>
                    <Link onClick={() => setActiveTab(Tab.ABOUT)} to="/about">About</Link>
                </li>
            </ul>
        </nav>
    </header>
};