import {NavLink} from "react-router-dom";
import './CategoryList.scss';
import React from "react";

export const CategoryList = () => {
    return <ul className={"CategoryList"}>
        <li className={'CategoryList__wrapper'}>
            <NavLink exact to={'/'} className={'CategoryList__category'}
                     activeClassName="CategoryList__category--active">all</NavLink></li>
        <li className={'CategoryList__wrapper'}>
            <NavLink exact to={'/vector-graphic'}
                     className={'CategoryList__category'}
                     activeClassName="CategoryList__category--active">vector
                graphic</NavLink></li>
        <li className={'CategoryList__wrapper'}>
            <NavLink exact to={'/bitmap-graphic'}
                     className={'CategoryList__category'}
                     activeClassName="CategoryList__category--active">bitmap
                graphic</NavLink></li>
        <li className={'CategoryList__wrapper'}>
            <NavLink exact to={'/logo'}
                     className={'CategoryList__category'}
                     activeClassName="CategoryList__category--active">logo</NavLink>
        </li>
    </ul>;
};