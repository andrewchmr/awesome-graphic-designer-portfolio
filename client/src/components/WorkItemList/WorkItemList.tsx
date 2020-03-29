import {WorkItem} from "./WorkItem/WorkItem";
import React from "react";
import './WorkItemList.scss';
// @ts-ignore
import {CSSTransitionGroup} from 'react-transition-group'
import {Loader} from "../Loader/Loader";
import {NavLink} from "react-router-dom";
import {Category} from "../../App";

export const WorkItemList = ({workItemList, currentCategory}: { workItemList: WorkItem[], currentCategory: Category }) => {
    if (workItemList.length > 0) {
        return <div>
            <ul className={"WorkItemList__category-list"}>
                <li className={'WorkItemList__category-wrapper'}>
                    <NavLink exact to={'/'} className={'WorkItemList__category'}
                             activeClassName="WorkItemList__category--active">all</NavLink></li>
                <li className={'WorkItemList__category-wrapper'}>
                    <NavLink exact to={'/vector-graphic'}
                             className={'WorkItemList__category'}
                             activeClassName="WorkItemList__category--active">vector
                        graphic</NavLink></li>
                <li className={'WorkItemList__category-wrapper'}>
                    <NavLink exact to={'/bitmap-graphic'}
                             className={'WorkItemList__category'}
                             activeClassName="WorkItemList__category--active">bitmap
                        graphic</NavLink></li>
                <li className={'WorkItemList__category-wrapper'}>
                    <NavLink exact to={'/logotype'}
                             className={'WorkItemList__category'}
                             activeClassName="WorkItemList__category--active">logotype</NavLink>
                </li>
            </ul>
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