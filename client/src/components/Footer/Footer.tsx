import React from "react";
import './Footer.scss';

export const Footer = () => {
    return <footer className='Footer'>
        <ul className="Footer__social-icons">
            <li><a href="https://www.facebook.com/kristina.chychkovska" target="_blank" rel="noopener noreferrer">
                <i className="icon-facebook-official"/></a></li>
            <li><a href="https://www.instagram.com/kristinychh/" target="_blank" rel="noopener noreferrer">
                <i className="icon-instagram"/></a></li>
            {/*   <li><a href="" target="_blank"><i className="icon-linkedin-squared"/></a></li>*/}
            <li><a href="https://www.behance.net/vernalbloom1" target="_blank" rel="noopener noreferrer">
                <i className="icon-behance"/></a></li>
        </ul>
        <p className='Footer__copyright'>All content copyright Vernal Bloom 2020 ©</p>
    </footer>
};