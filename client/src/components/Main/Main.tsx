import React, {ReactNode} from "react";
import './Main.scss';

interface MainProps {
    children: ReactNode;
}

export const Main = ({children}: MainProps) => {
    return (
        <main className={'Main'}>
            <div className={'Main__container'}>
                {children}
            </div>
        </main>
    );
};