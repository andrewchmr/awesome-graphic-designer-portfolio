import React, {ReactNode} from "react";
import './Main.scss';

interface MainProps {
    children: ReactNode;
}

export const Main = ({children}: MainProps) => {
    return (
        <main className={'main'}>
            <div className={'main__container'}>
                {children}
            </div>
        </main>
    );
};