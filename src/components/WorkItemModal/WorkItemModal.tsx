import * as React from "react";
import './WorkItemModal.scss';
import {useHistory} from "react-router-dom";
import useBodyClass from "../../utils/useBodyClass";
import 'react-awesome-slider/dist/styles.css';
import {toSeoUrl} from "../../utils/toSeoUrl";
import {CloseButton} from "./CloseButton/CloseButton";
import {useEffect, useRef, useState} from "react";
import AwesomeSlider from 'react-awesome-slider';
// @ts-ignore
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {WorkItem} from "../WorkItemList/WorkItem/WorkItem";
import './AwesomeSlider/AwesomeSlider.scss';
import {Helmet} from "react-helmet";
import {StartUpScreen} from "./StartUpScreen/StartUpScreen";

interface IAwesomeSlider extends AwesomeSlider {
    clickPrev: () => void,
    clickNext: () => void,
    state: {
        index: number
    }
}

const getItemByFileName = (list: WorkItem[]): WorkItem => {
    const url = window.location.pathname;
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    let item = list[0];
    list.forEach((workItem) => {
        if (toSeoUrl(workItem.imageName) === fileName) {
            item = workItem;
        }
    });

    return item;
};

export const WorkItemModal = ({workItemList}: { workItemList: WorkItem[] }) => {
        const history = useHistory();
        useBodyClass(`modal--open`);
        const [initialWorkItem] = useState(getItemByFileName(workItemList));
        const awesomeSlider = useRef<IAwesomeSlider>(null);
        const [title, setTitle] = useState('Vernal Bloom');

        useEffect(() => {
            const handleKeyboardEvent = (event: KeyboardEvent) => {
                switch (event.code) {
                    case 'Escape':
                        history.push(`/`);
                        break;
                    case 'ArrowLeft':
                        awesomeSlider.current && awesomeSlider.current.clickPrev();
                        break;
                    case 'ArrowRight':
                        awesomeSlider.current && awesomeSlider.current.clickNext();
                        break;
                }
            };
            window.addEventListener('keydown', handleKeyboardEvent);
            return () => window.removeEventListener('keydown', handleKeyboardEvent);
        }, [history]);

        const handleTransitionEnd = ({currentIndex}: { currentIndex: number }) => {
            const imageName = workItemList[currentIndex].imageName;
            history.push(`/work/${toSeoUrl(imageName)}`);
            setTitle(`${imageName} — Vernal Bloom`);
        };

        const isAwesomeSliderLoaded = () => awesomeSlider.current && awesomeSlider.current.state.index !== undefined;

        return <div className="WorkItemModal">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <AwesomeSlider startupScreen={<StartUpScreen/>}
                           ref={awesomeSlider}
                           selected={initialWorkItem.id}
                           fillParent={true}
                           bullets={!!(isAwesomeSliderLoaded())}
                           onTransitionEnd={handleTransitionEnd}
                           cssModule={AwesomeSliderStyles}>
                {workItemList.map((workItem: WorkItem) =>
                    <div key={workItem.id} data-alt={`Vernal Bloom - ${workItem.imageName}`}
                         data-src={require(`../../images/${workItem.fileName}.jpg`)}>
                        <h1 className={'WorkItemModal__image-title'}>{workItem.imageName}</h1>
                    </div>
                )}
            </AwesomeSlider>
            {isAwesomeSliderLoaded() && <CloseButton/>}
        </div>
    }
;