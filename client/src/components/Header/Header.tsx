import React, {useEffect, useState, MouseEvent} from "react";
import './Header.scss';
import {NavLink} from "react-router-dom";
import smoothscroll from 'smoothscroll-polyfill';
import {HeaderCategoryMenu} from "./HeaderCategoryMenu/HeaderCategoryMenu";
import {scrollTop} from "../../utils/scrollTop";

smoothscroll.polyfill();

const isScrolledToTop = () => window.scrollY <= 0;

export const Header = () => {
    const {scrollTop: pageYOffset} = document.documentElement || document.body;
    const [positionY, setPositionY] = useState(pageYOffset);
    const [visible, setVisible] = useState(true);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [showMainMenu, setShowMainMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(isScrolledToTop() ? true : positionY > pageYOffset);
            positionY > pageYOffset && hideAllMenus();
            setPositionY(pageYOffset);
        };
        window.addEventListener("scroll", handleScroll);
        return (() => window.removeEventListener("scroll", handleScroll));
    });

    const isWorkTabActive = () => {
        const workTabs = ['/', '/vector-graphic', '/bitmap-graphic', '/logo'];
        return workTabs.includes(window.location.pathname);
    };

    const handleTabClick = () => {
        setShowMainMenu(!showMainMenu);
        setShowCategoryMenu(false);
    };

    const hideAllMenus = () => {
        setShowCategoryMenu(false);
        setShowMainMenu(false);
    };

    const handleWorkTabClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowCategoryMenu(!showCategoryMenu);
    };

    const handleLogoClick = () => {
        scrollTop();
        hideAllMenus();
    };

    const getIconDownOpenClass = () => {
        return `icon-down-open ${showCategoryMenu ? 'icon-down-open--down' : ''}`;
    };

    return <header className={`Header${visible ? '' : ' Header--hidden'}`}>
        <nav>
            <input className="Header__menu-button"
                   checked={showMainMenu}
                   onChange={handleTabClick} type="checkbox" id="menu-button"/>
            <label className="Header__menu-icon" htmlFor="menu-button"><span/></label>
            <NavLink className="Header__logo" onClick={handleLogoClick} to={'/'}/>
            <ul className="Header__nav-sub">
                <li className={'Header__tab-work-mobile'}>
                    <NavLink to={''}
                             isActive={isWorkTabActive}
                             activeClassName="Header__link--active"
                             className={`Header__link`}
                             onClick={handleWorkTabClick}>Work <i
                        className={getIconDownOpenClass()}/></NavLink>
                </li>
                <li className={'Header__tab-work Header__tab'}>
                    <NavLink to={'/'}
                             isActive={isWorkTabActive}
                             activeClassName="Header__link--active"
                             className={`Header__link`}>Work</NavLink>
                </li>
                <HeaderCategoryMenu show={showCategoryMenu}
                                    isWorkTabActive={isWorkTabActive()}
                                    handleTabClick={handleTabClick}/>
                <li className={'Header__tab'}>
                    <NavLink to="/about" className={'Header__link'} onClick={handleTabClick}
                             activeClassName="Header__link--active">About</NavLink>
                </li>
            </ul>
        </nav>
    </header>
};