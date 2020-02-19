import React, {useEffect, useRef, useState} from "react";
import './Header.scss';
import {NavLink} from "react-router-dom";

const isScrolledToBottom = () => {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
};

const isScrolledToTop = () => {
    return window.scrollY <= 0;
};

export const Header = () => {
    const pageYOffset = window.pageYOffset;
    const [positionY, setPositionY] = useState(pageYOffset);
    const [visible, setVisible] = useState(true);
    const menuButton = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolledToBottom()) {
                setVisible(false);
            } else if (isScrolledToTop()) {
                setVisible(true)
            } else {
                setVisible(positionY > pageYOffset);
            }
            setPositionY(pageYOffset);
        };
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        })
    });

    const hideMobileMenuNav = () => {
        if (menuButton && menuButton.current) {
            menuButton.current.checked = false;
        }
    };

    return <header className={`Header ${visible ? '' : 'Header--hidden'}`}>
        <nav>
            <input className="Header__menu-button" ref={menuButton} type="checkbox" id="menu-button"/>
            <label className="Header__menu-icon" htmlFor="menu-button"><span/></label>
            <ul className="Header__nav-sub" onClick={hideMobileMenuNav}>
                <li><NavLink className="Header__logo" to={'/'}/></li>
                <li className={'Header__tab'}>
                    <NavLink exact to={'/'} className={'Header__link'}
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