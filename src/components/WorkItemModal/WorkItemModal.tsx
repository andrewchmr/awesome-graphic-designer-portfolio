import * as React from "react";
import './WorkItemModal.scss';
import {useHistory} from "react-router-dom";
import useBodyClass from "../../utils/useBodyClass";
import 'react-awesome-slider/dist/styles.css';
import {toSeoUrl} from "../../utils/toSeoUrl";
import {CloseButton} from "./CloseButton/CloseButton";
import {useRef, useState} from "react";
import AwesomeSlider from 'react-awesome-slider';
// @ts-ignore
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {WorkItem} from "../WorkItem/WorkItem";
import './AwesomeSlider/AwesomeSlider.scss';
import {Helmet} from "react-helmet";

interface WorkItemModalProps {
    initialWorkItem: WorkItem;
    workItemList: WorkItem[];
}

interface IAwesomeSlider extends AwesomeSlider {
    state: {
        index: number
    }
}

export const WorkItemModal = ({initialWorkItem, workItemList}: WorkItemModalProps) => {
        const history = useHistory();
        useBodyClass(`modal--open`);
        const awesomeSlider = useRef<IAwesomeSlider>(null);
        const [title, setTitle] = useState('Vernal Bloom');

        const handleTransitionEnd = ({currentIndex}: { currentIndex: number }) => {
            const imageName = workItemList[currentIndex].imageName;
            history.push(`/work/${toSeoUrl(imageName)}`);
            setTitle(`${imageName} — Vernal Bloom`);
        };

        const isAwesomeSliderLoaded = () => awesomeSlider.current && awesomeSlider.current.state.index !== undefined;

        const showStartUpScreen = () => {
            return <div>
                <img src={require(`../../logo.svg`)} alt={'Vernal Bloom logo'}/>
            </div>
        };

        return <div className="WorkItemModal">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <AwesomeSlider startupScreen={showStartUpScreen()}
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