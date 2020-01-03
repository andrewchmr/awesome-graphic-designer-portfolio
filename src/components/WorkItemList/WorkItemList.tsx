import {WorkItem} from "../WorkItem/WorkItem";
import React from "react";
import {Route, Switch} from "react-router";
import {WorkItemModal} from "../WorkItemModal/WorkItemModal";
import './WorkItemList.scss';

export const WorkItemList = () => {
    return <section className="WorkItemList">
        <WorkItem fileName={'image4.jpg'} imageName={'Girl Illustration'}/>
        <WorkItem fileName={'image5.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image6.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image7.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image8.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image9.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image6.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image7.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image8.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image9.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image4.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image5.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image6.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image7.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image8.jpg'} imageName={'Illustration'}/>
        <WorkItem fileName={'image9.jpg'} imageName={'Illustration'}/>
        <Switch>
            <Route path={`/work/:workName`} children={<WorkItemModal/>}/>
        </Switch>
    </section>
};
