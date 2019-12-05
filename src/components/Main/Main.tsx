import React from "react";
import './Main.scss';

export const Main = (props: any) => {
    return (
        <main>
            <div className={'container'}>
                {props.children}
            </div>
        </main>
    );
};