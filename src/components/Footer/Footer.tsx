import React from "react";
import './Footer.scss';
import '../../fontello-f8a6cfaf/css/fontello.css';

export const Footer = () => {
    return <footer className={'footer'}>
        <ul className="footer__content">
            <li><a href="" target="_blank"><i className="icon-facebook-official"/></a></li>
            <li><a href="" target="_blank"><i className="icon-instagram"/></a></li>
            <li><a href="" target="_blank"><i className="icon-linkedin-squared"/></a></li>
            <li><a href="" target="_blank"><i className="icon-behance"/></a></li>
            <p className={'footer__copyright'}>All content copyright Vernal Bloom 2020 ©</p>
        </ul>
    </footer>
};