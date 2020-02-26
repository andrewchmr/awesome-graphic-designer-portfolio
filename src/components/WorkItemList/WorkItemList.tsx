import {WorkItem} from "../WorkItem/WorkItem";
import React from "react";
import {Route, Switch} from "react-router";
import {WorkItemModal} from "../WorkItemModal/WorkItemModal";
import './WorkItemList.scss';
import {toSeoUrl} from "../../utils/toSeoUrl";

const mockWorkItems: WorkItem[] = [
    {
        id: 0,
        fileName: 'tropical',
        imageName: 'Tropical',
    },
    {
        id: 1,
        fileName: 'portrait-of-desi-perkins',
        imageName: 'Portrait Of Desi Perkins',
    },
    {
        id: 2,
        fileName: 'portrait-of-vika',
        imageName: 'Portrait Of Vika',
    },
    {
        id: 3,
        fileName: 'portrait-of-nastya',
        imageName: 'Portrait Of Nastya',
    },
    {
        id: 4,
        fileName: 'andrew-profile-logo',
        imageName: 'Andrew Profile Logo',
    },
    {
        id: 5,
        fileName: 'i-love-to-feel',
        imageName: 'I Love To Feel',
    },
    {
        id: 6,
        fileName: 'doberman-lover',
        imageName: 'Doberman Lover',
    },
    {
        id: 7,
        fileName: 'portrait-of-zhenya',
        imageName: 'Portrait Of Zhenya',
    },
    {
        id: 8,
        fileName: 'crystal',
        imageName: 'Crystal',
    },
    {
        id: 9,
        fileName: 'girl-illustration',
        imageName: 'Girl Illustration',
    },
    {
        id: 10,
        fileName: 'leon-maison-margiela-SS20',
        imageName: 'Leon, Maison Margiela SS20',
    },
    {
        id: 11,
        fileName: 'music-album-poster',
        imageName: 'Music Album Poster',
    },
    {
        id: 12,
        fileName: 'portrait-of-kate',
        imageName: 'Portrait Of Kate',
    },
    {
        id: 13,
        fileName: 'portrait-of-lera',
        imageName: 'Portrait Of Lera',
    },

    {
        id: 14,
        fileName: 'portrait-of-valeria',
        imageName: 'Portrait Of Valeria',
    },
];

export const WorkItemList = () => {

    const getItemByFileName = (): WorkItem => {
        const url = window.location.pathname;
        const fileName = url.substring(url.lastIndexOf('/') + 1);

        let item = mockWorkItems[0];
        mockWorkItems.forEach((workItem) => {
            if (toSeoUrl(workItem.imageName) === fileName) {
                item = workItem;
            }
        });

        return item;
    };

    return <section className="WorkItemList">
        {mockWorkItems.map((workItem: WorkItem) =>
            <WorkItem key={workItem.id} {...workItem}/>)}
        <Switch>
            <Route path={`/work/:fileName`}>
                <WorkItemModal
                    workItemList={mockWorkItems}
                    initialWorkItem={getItemByFileName()}/>
            </Route>
        </Switch>
    </section>
};
