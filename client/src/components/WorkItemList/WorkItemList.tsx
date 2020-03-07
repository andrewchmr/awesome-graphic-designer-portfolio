import {WorkItem} from "./WorkItem/WorkItem";
import React from "react";
import './WorkItemList.scss';
import {Loader} from "../Loader/Loader";

export const WorkItemList = ({workItemList}: { workItemList: WorkItem[] }) => {
    if (workItemList.length > 0) {
        return <section className="WorkItemList">{workItemList.map((workItem: WorkItem) =>
            <WorkItem key={workItem._id} {...workItem}/>)}</section>
    } else {
        return <Loader/>;
    }
};