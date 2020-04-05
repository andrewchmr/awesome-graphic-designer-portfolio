import {WorkItem} from "../../WorkItemList/WorkItem/WorkItem";
import * as React from "react";
import {IAwesomeSlider, MAX_BULLETS_COUNT} from "../WorkItemModal";
import {RefObject} from "react";

interface BulletsProps {
    workItemList: WorkItem[],
    minIndex: number,
    maxIndex: number,
    awesomeSlider: RefObject<IAwesomeSlider>,
    bulletsCount: number
}

const BULLET_WIDTH = 30;

export const Bullets = ({workItemList, maxIndex, minIndex, awesomeSlider, bulletsCount}: BulletsProps) => {

    const isMinOrMaxIndex = (index: number) => {
        return index === minIndex || index === maxIndex;
    };

    const isEdgeIndex = (index: number) => {
        return index === 0 || index === workItemList.length - 1;
    };

    const getDotClassname = (index: number) => {
        if (awesomeSlider.current && awesomeSlider.current.state.index === index) {
            return 'awssld__bullets--active';
        } else if (isMinOrMaxIndex(index) && !isEdgeIndex(index)) {
            return 'awssld__bullets--micro';
        }
    };

    const getTranslateX = () => {
        if (bulletsCount > MAX_BULLETS_COUNT - 1) {
            return (BULLET_WIDTH * bulletsCount - BULLET_WIDTH) / 2 - (minIndex + 2) * BULLET_WIDTH;
        } else {
            return 0;
        }
    };

    return <div className={'awssld__bullets'} style={{width: BULLET_WIDTH * bulletsCount + 'px'}}>
        <ul className={'awssld__bullets-list'}
            style={{transform: `translateX(${getTranslateX()}px)`}}>
            {workItemList.map((workItem: WorkItem, index: number) => <li key={`bullet-${index}`}
                                                                         className="awssld__bullets-wrapper">
                <button onClick={awesomeSlider.current && awesomeSlider.current.bulletClick}
                        data-index={index}
                        className={getDotClassname(index)}>{index}</button>
            </li>)}
        </ul>
    </div>
};