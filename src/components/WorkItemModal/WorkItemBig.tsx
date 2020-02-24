import React from "react";
import {WorkItem} from "../WorkItem/WorkItem";

export const WorkItemBig = ({fileName, imageName}: WorkItem) => {
    return <>
        <img className={'WorkItemModal__image'}
             src={require(`../../images/${fileName}.jpg`)}
             alt={`Vernal Bloom - ${imageName}`}/>
        <h1 className={'WorkItemModal__image-title'}>{imageName}</h1>
    </>
};