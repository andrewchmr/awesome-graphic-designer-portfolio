import * as React from "react";
import './StartUpScreen.scss';
import {useEffect} from "react";
import lottie from "lottie-web";
import {useRef} from "react";

export const StartUpScreen = () => {
    const logoAnimation = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logoAnimation.current) {
            lottie.loadAnimation({
                container: logoAnimation.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('./logoAnimation.json'),
            });
        }
    }, []);

    return <div className={"StartUpScreen"}>
        <div ref={logoAnimation} className={"StartUpScreen__animation"}/>
    </div>
};