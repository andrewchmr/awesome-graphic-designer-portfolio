import * as React from "react";
import './WorkItemModal.scss';
import {useHistory} from "react-router-dom";
import useBodyClass from "../../utils/useBodyClass";
import 'react-awesome-slider/dist/styles.css';
import {toSeoUrl} from "../../utils/toSeoUrl";
import {CloseButton} from "./CloseButton/CloseButton";
import {useRef} from "react";
// @ts-ignore
import AwesomeSlider from 'react-awesome-slider';
// @ts-ignore
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {WorkItem} from "../WorkItem/WorkItem";
import './AwesomeSlider/AwesomeSlider.scss';

interface WorkItemModalProps {
    workItem: WorkItem;
    workItemList: WorkItem[];
}

export const WorkItemModal = ({workItem, workItemList}: WorkItemModalProps) => {
        const history = useHistory();
        useBodyClass(`modal--open`);
        const awesomeSlider: any = useRef();

        const updateUrl = () => {
            const index = awesomeSlider.current.state.index;
            history.push(`/work/${toSeoUrl(workItemList[index].imageName)}`);
        };

        const isAwesomeSliderLoaded = () => awesomeSlider.current && awesomeSlider.current.state.index !== undefined;

        const showStartUpScreen = () => {
            return <div>
                <img src={require(`../../logo.svg`)}/>
            </div>
        };

        return <div className="WorkItemModal">
            <AwesomeSlider startupScreen={showStartUpScreen()}
                           ref={awesomeSlider}
                           selected={workItem.id}
                           fillParent={true}
                           bullets={!!(isAwesomeSliderLoaded())}
                           onTransitionEnd={updateUrl}
                           cssModule={AwesomeSliderStyles}>
                {workItemList.map((workItem: WorkItem) =>
                    <div key={workItem.id}>
                        <img className={'WorkItemModal__image'}
                             src={require(`../../images/${workItem.fileName}.jpg`)}
                             alt={`Vernal Bloom - ${workItem.imageName}`}/>
                        <h1 className={'WorkItemModal__image-title'}>{workItemList[workItem.id].imageName}</h1>
                    </div>)}
            </AwesomeSlider>
            {isAwesomeSliderLoaded() && <CloseButton/>}
        </div>
    }
;