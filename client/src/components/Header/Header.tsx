import React, {useEffect, useRef, useState} from "react";
import './Header.scss';
import {NavLink} from "react-router-dom";
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const isScrolledToTop = () => window.scrollY <= 0;

export const Header = () => {
    const {scrollTop: pageYOffset} = document.documentElement || document.body;
    const [positionY, setPositionY] = useState(pageYOffset);
    const [visible, setVisible] = useState(true);
    const menuButton = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(isScrolledToTop() ? true : positionY > pageYOffset);
            setPositionY(pageYOffset);
        };
        window.addEventListener("scroll", handleScroll);
        return (() => window.removeEventListener("scroll", handleScroll));
    });

    const hideMobileMenuNav = () => {
        if (menuButton && menuButton.current) {
            menuButton.current.checked = false;
        }
    };

    const scrollTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    const isTabActive = (_: any, {pathname}: any) => {
        return ['/', '/vector-graphic', '/bitmap-graphic', '/logotype'].includes(pathname);
    };

    return <header className={`Header${visible ? '' : ' Header--hidden'}`}>
        <nav>
            <input className="Header__menu-button" ref={menuButton} type="checkbox" id="menu-button"/>
            <label className="Header__menu-icon" htmlFor="menu-button"><span/></label>
            <NavLink className="Header__logo" onClick={scrollTop} to={'/'}/>
            <ul className="Header__nav-sub" onClick={hideMobileMenuNav}>
                <li className={'Header__tab'}>
                    <NavLink exact to={'/'}
                             isActive={isTabActive}
                             onClick={scrollTop} className={'Header__link'}
                             activeClassName="Header__link--active">Work</NavLink>
                </li>
                <li className={'Header__tab'}>
                    <NavLink to="/about" className={'Header__link'}
                             activeClassName="Header__link--active">About</NavLink>
                </li>
            </ul>
        </nav>
    </header>
};