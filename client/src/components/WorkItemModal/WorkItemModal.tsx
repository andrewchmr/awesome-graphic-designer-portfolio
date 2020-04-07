import * as React from "react";
import {useEffect, useRef, useState} from "react";
import './WorkItemModal.scss';
import {useHistory} from "react-router-dom";
import useBodyClass from "../../utils/useBodyClass";
import 'react-awesome-slider/dist/styles.css';
import {toSeoUrl} from "../../utils/toSeoUrl";
import {CloseButton} from "./CloseButton/CloseButton";
import AwesomeSlider from 'react-awesome-slider';
// @ts-ignore
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {WorkItem} from "../WorkItemList/WorkItem/WorkItem";
import './AwesomeSlider/AwesomeSlider.scss';
import {Helmet} from "react-helmet";
import {StartUpScreen} from "./StartUpScreen/StartUpScreen";
import {Category} from "../../App";
import {Bullets} from "./Bullets/Bullets";

export interface IAwesomeSlider extends AwesomeSlider {
    clickPrev: () => void,
    clickNext: () => void,
    bulletClick: any,
    state: {
        index: number
    },
    slider: HTMLElement
}

export const MAX_BULLETS_COUNT = 5;

const getItemByFileName = (list: WorkItem[]): WorkItem => {
    const url = window.location.pathname;
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    let item = list[0];
    list.forEach((workItem) => {
        if (toSeoUrl(workItem.title) === fileName) {
            item = workItem;
        }
    });

    return item;
};

export const WorkItemModal = ({workItemList, currentCategory}: { workItemList: WorkItem[], currentCategory: Category }) => {
        const history = useHistory();
        useBodyClass(`modal--open`);
        const awesomeSlider = useRef<IAwesomeSlider>(null);
        const [title, setTitle] = useState('Vernal Bloom');
        const [minIndex, setMinIndex] = useState(0);
        const [maxIndex, setMaxIndex] = useState(4);
        const [bulletsCount, setBulletsCount] = useState(MAX_BULLETS_COUNT);

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

        useEffect(() => {
            const id = workItemList.indexOf(getItemByFileName(workItemList));
            const listLength = workItemList.length;
            if (listLength > 0 && listLength < MAX_BULLETS_COUNT) {
                setBulletsCount(listLength);
            }
            if (id > 1 && id < listLength - 2) {
                setMinIndex(id - 2);
                setMaxIndex(id + 2);
            }
            if (id >= listLength - 2) {
                setMinIndex(listLength - bulletsCount - 1);
                setMaxIndex(id - 1);
            }
        }, [workItemList, bulletsCount]);

        const updateBullets = () => {
            const id = getCurrentId();
            if (id !== undefined) {
                if (id >= workItemList.length - 1) {
                    setMinIndex(workItemList.length - bulletsCount);
                    setMaxIndex(id);
                    return;
                }
                if (id <= 1) {
                    setMinIndex(0);
                    setMaxIndex(bulletsCount - 1);
                    return;
                }
                if (id < minIndex + 1) {
                    setMaxIndex(maxIndex - 1);
                    setMinIndex(id - 1);
                }
                if (id > maxIndex - 1) {
                    setMinIndex(minIndex + 1);
                    setMaxIndex(id + 1);
                }
            }
        };

        const handleTransitionEnd = ({currentIndex}: { currentIndex: number }) => {
            const currentWorkItem = workItemList[currentIndex];
            if (awesomeSlider.current) {
                const slider = awesomeSlider.current.slider;
                slider.style.setProperty('--content-background-color', currentWorkItem.color);
            }
            const imageName = currentWorkItem.title;
            const url = currentCategory ? `/${currentCategory}` : '/work';
            history.push(`${url}/${toSeoUrl(imageName)}`);
            setTitle(`${imageName} — Vernal Bloom`);
            updateBullets();
        };

        const isAwesomeSliderLoaded = () => awesomeSlider.current && awesomeSlider.current.state.index !== null;

        const getCurrentId = () => {
            if (workItemList.length > 0) {
                return workItemList.indexOf(getItemByFileName(workItemList));
            } else {
                return undefined;
            }
        };

        const getExitUrl = () => {
            switch (currentCategory) {
                case Category.ALL:
                    return '/';
                case Category.VECTOR:
                    return '/vector-graphic';
                case Category.BITMAP:
                    return '/bitmap-graphic';
                case Category.LOGOTYPE:
                    return '/logo';
            }
        };

        return <div className="WorkItemModal">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={`${title}. The work of Ukrainian artist, Vernal Bloom.`}/>
            </Helmet>
            <AwesomeSlider startupScreen={<StartUpScreen/>}
                           startupDelay={600}
                           ref={awesomeSlider}
                           selected={getCurrentId()}
                           fillParent={true}
                           bullets={false}
                           onTransitionEnd={handleTransitionEnd}
                           cssModule={AwesomeSliderStyles}
                           customContent={isAwesomeSliderLoaded() &&
                           <Bullets workItemList={workItemList}
                                    minIndex={minIndex}
                                    maxIndex={maxIndex}
                                    bulletsCount={bulletsCount}
                                    awesomeSlider={awesomeSlider}/>}>
                {workItemList.map((workItem: WorkItem) =>
                    <div key={workItem._id}
                         data-alt={`Vernal Bloom - ${workItem.title}`}
                         data-src={workItem.image}>
                        <h1 className={'WorkItemModal__image-title'}>{workItem.title}</h1>
                    </div>
                )}
            </AwesomeSlider>
            {isAwesomeSliderLoaded() && <CloseButton goToPath={getExitUrl()}/>}
        </div>
    }
;