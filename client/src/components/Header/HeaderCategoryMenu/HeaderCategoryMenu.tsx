import {NavLink} from "react-router-dom";
import React from "react";
import {scrollTop} from "../../../utils/scrollTop";
import './HeaderCategoryMenu.scss';

interface HeaderCategoryMenuProps {
    show: boolean,
    handleTabClick: () => void,
    isWorkTabActive: boolean
}

export const HeaderCategoryMenu = ({show, handleTabClick, isWorkTabActive}: HeaderCategoryMenuProps) => {

    const getLinkCategoryClassname = () => {
        return `HeaderCategoryMenu__link ${isWorkTabActive ? 'HeaderCategoryMenu__link--highlight' : ''}`;
    };

    return <ul className={`Header__nav-sub HeaderCategoryMenu ${show ? 'HeaderCategoryMenu--visible' : ''}`}>
        <li className={'Header__tab'} onClick={handleTabClick}>
            <NavLink exact to={'/'}
                     onClick={scrollTop}
                     className={getLinkCategoryClassname()}
                     activeClassName="HeaderCategoryMenu__link--active">all</NavLink>
        </li>
        <li className={'Header__tab'} onClick={handleTabClick}>
            <NavLink exact to={'/vector-graphic'}
                     onClick={scrollTop}
                     className={getLinkCategoryClassname()}
                     activeClassName="HeaderCategoryMenu__link--active">vector graphic</NavLink>
        </li>
        <li className={'Header__tab'} onClick={handleTabClick}>
            <NavLink exact to={'/bitmap-graphic'}
                     onClick={scrollTop}
                     className={getLinkCategoryClassname()}
                     activeClassName="HeaderCategoryMenu__link--active">bitmap graphic</NavLink>
        </li>
        <li className={'Header__tab'} onClick={handleTabClick}>
            <NavLink exact to={'/logotype'} onClick={scrollTop}
                     className={getLinkCategoryClassname()}
                     activeClassName="HeaderCategoryMenu__link--active">logo</NavLink>
        </li>
    </ul>;
};