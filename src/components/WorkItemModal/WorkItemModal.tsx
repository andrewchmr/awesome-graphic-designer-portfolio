import * as React from "react";
import './WorkItemModal.scss';
import {useHistory} from "react-router-dom";
import useBodyClass from "../../utils/useBodyClass";
import 'react-awesome-slider/dist/styles.css';
import {toSeoUrl} from "../../utils/toSeoUrl";
import {CloseButton} from "./CloseButton/CloseButton";
import {useRef} from "react";
import AwesomeSlider from 'react-awesome-slider';
// @ts-ignore
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {WorkItem} from "../WorkItem/WorkItem";
import './AwesomeSlider/AwesomeSlider.scss';
import {Helmet} from "react-helmet";

interface WorkItemModalProps {
    workItem: WorkItem;
    workItemList: WorkItem[];
}

interface IAwesomeSlider extends AwesomeSlider {
    state: {
        index: number
    }
}

export const WorkItemModal = ({workItem, workItemList}: WorkItemModalProps) => {
        const history = useHistory();
        useBodyClass(`modal--open`);
        const awesomeSlider = useRef<IAwesomeSlider>(null);

        const updateUrl = () => {
            if (awesomeSlider && awesomeSlider.current) {
                const index = awesomeSlider.current.state.index;
                history.push(`/work/${toSeoUrl(workItemList[index].imageName)}`);
            }
        };

        const isAwesomeSliderLoaded = () => awesomeSlider.current && awesomeSlider.current.state.index !== undefined;

        const showStartUpScreen = () => {
            return <div>
                <img src={require(`../../logo.svg`)} alt={'Vernal Bloom logo'}/>
            </div>
        };

        const getTitle = () => {
            if (isAwesomeSliderLoaded() && awesomeSlider.current) {
                return `${workItemList[awesomeSlider.current.state.index].imageName} — Vernal Bloom`;
            } else {
                return 'Vernal Bloom';
            }
        };

        return <div className="WorkItemModal">
            <Helmet>
                <title>{getTitle()}</title>
            </Helmet>
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