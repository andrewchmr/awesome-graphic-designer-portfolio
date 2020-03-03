import {WorkItem} from "./WorkItem/WorkItem";
import React from "react";
import './WorkItemList.scss';

export const WorkItemList = ({workItemList}: { workItemList: WorkItem[] }) => {
    return <section className="WorkItemList">
        {workItemList.map((workItem: WorkItem) =>
            <WorkItem key={workItem._id} {...workItem}/>)}
    </section>
};