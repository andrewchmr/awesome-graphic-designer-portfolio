import React from "react";
import './About.scss';

export const About = () => {
    return <div className={'About'}>
        <div className={'About__designer-desc'}>
            <img className={'About__image'} alt="Vernal Bloom - Self Portrait"
                 src="https://res.cloudinary.com/htn4pmlv5/image/upload/c_scale,w_800/v1584045962/ox0uy637qddzbljthihx.jpg"/>
            <div className={'About__desc'}>
            <span className={'About__desc-bio'}>I am a Ukrainian artist based in Poland. I have been studying visual arts for 5 years and chose graphic
                design as my specialization. I started drawing in the early childhood as it was my biggest passion.
                Since
                than I wanted to develop my skills, tried new techniques and switched from traditional art to digital
                media.
                Now I am interested in vector&bitmap graphic. I create logos, illustrations and posters. Also I'm fond
                of
                motion and web design and still looking for my own style. I'm always open for collaborations and new
                challenges :)</span>
                <div className={'About__contact'}>
                    <div>Contact me!</div>
                    <div>Email: <a className={'About__email'}
                                   href='mailto:vernalbloomart@gmail.com'>vernalbloomart@gmail.com</a></div>
                </div>
            </div>
        </div>
        <p className={'About__author-desc'}>Website by <a target="_blank" rel="noopener noreferrer"
                                                          className={'About__email'}
                                                          href='https://github.com/andrewchmr'>@andrewchmr</a>
        </p>
    </div>
};