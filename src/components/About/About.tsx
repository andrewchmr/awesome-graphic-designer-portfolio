import React from "react";
import './About.scss';

export const About = () => {
    return <div className={'About'}>
        <p>Vernal Bloom is a Ukrainian artist based in Poland.</p>
        <p>Contact me!</p>
        <p>Email: <a className={'About__email'} href='mailto:vernalbloomart@gmail.com'>vernalbloomart@gmail.com</a></p>
        <p>Website by <a target="_blank" rel="noopener noreferrer" className={'About__email'}
                         href='https://github.com/andrewchmr'>@andrewchmr</a>
        </p>
    </div>
};