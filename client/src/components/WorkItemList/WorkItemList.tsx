import {WorkItem} from "./WorkItem/WorkItem";
import React from "react";
import './WorkItemList.scss';
// @ts-ignore
import {CSSTransitionGroup} from 'react-transition-group'
import {Loader} from "../Loader/Loader";
import {NavLink} from "react-router-dom";
import {Category} from "../../App";
import {Helmet} from "react-helmet";

export const WorkItemList = ({workItemList, currentCategory}: { workItemList: WorkItem[], currentCategory: Category }) => {

    const getFilter = (item: WorkItem) => {
        if (currentCategory === Category.ALL) {
            return true;
        } else if (currentCategory === Category.VECTOR) {
            return item.category === Category.VECTOR;
        } else if (currentCategory === Category.BITMAP) {
            return item.category === Category.BITMAP;
        } else if (currentCategory === Category.LOGOTYPE) {
            return item.category === Category.LOGOTYPE;
        }
    };

    const getTitle = () => {
        if (currentCategory === Category.ALL) {
            return 'Vernal Bloom';
        } else if (currentCategory === Category.VECTOR) {
            return 'Vector Graphic — Vernal Bloom';
        } else if (currentCategory === Category.BITMAP) {
            return 'Bitmap Graphic — Vernal Bloom';
        } else if (currentCategory === Category.LOGOTYPE) {
            return 'Logotype — Vernal Bloom';
        }
    };

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
                <Helmet>
                    <title>{getTitle()}</title>
                </Helmet>
                {workItemList.filter((item) => getFilter(item)).map((workItem: WorkItem) =>
                    <WorkItem currentCategory={currentCategory} key={workItem._id} {...workItem}/>)
                }
            </CSSTransitionGroup>
        </div>
    } else {
        return <Loader/>;
    }
};