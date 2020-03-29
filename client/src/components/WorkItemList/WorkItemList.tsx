import {WorkItem} from "./WorkItem/WorkItem";
import React from "react";
import './WorkItemList.scss';
// @ts-ignore
import {CSSTransitionGroup} from 'react-transition-group'
import {Loader} from "./Loader/Loader";
import {Category} from "../../App";
import {CategoryList} from "./CategoryList/CategoryList";

interface WorkItemListInterface {
    workItemList: WorkItem[],
    currentCategory: Category
}

export const WorkItemList = ({workItemList, currentCategory}: WorkItemListInterface) => {
    if (workItemList.length > 0) {
        return <div>
            <CategoryList/>
            <CSSTransitionGroup
                transitionName="work-item-transition"
                transitionEnterTimeout={1}
                transitionLeaveTimeout={300} className="WorkItemList">
                {workItemList.map((workItem: WorkItem) =>
                    <WorkItem currentCategory={currentCategory}
                              key={workItem._id}
                              {...workItem}/>)
                }
            </CSSTransitionGroup>
        </div>
    } else {
        return <Loader/>;
    }
};