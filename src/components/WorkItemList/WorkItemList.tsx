import {WorkItem} from "../WorkItem/WorkItem";
import React from "react";
import {Route, Switch} from "react-router";
import {WorkItemModal} from "../WorkItemModal/WorkItemModal";
import './WorkItemList.scss';
import {toSeoUrl} from "../../utils/toSeoUrl";

const mockWorkItems: WorkItem[] = [
    {
        id: 0,
        fileName: 'portrait-of-desi-perkins',
        imageName: 'Portrait Of Desi Perkins',
    },
    {
        id: 1,
        fileName: 'portrait-of-vika',
        imageName: 'Portrait Of Vika',
    },
    {
        id: 2,
        fileName: 'portrait-of-nastya',
        imageName: 'Portrait Of Nastya',
    },
    {
        id: 3,
        fileName: 'andrew-profile-logo',
        imageName: 'Andrew Profile Logo',
    },
    {
        id: 4,
        fileName: 'i-love-to-feel',
        imageName: 'I Love To Feel',
    },
    {
        id: 5,
        fileName: 'doberman-lover',
        imageName: 'Doberman Lover',
    },
    {
        id: 6,
        fileName: 'portrait-of-zhenya',
        imageName: 'Portrait Of Zhenya',
    },
    {
        id: 7,
        fileName: 'crystal',
        imageName: 'Crystal',
    },
    {
        id: 8,
        fileName: 'girl-illustration',
        imageName: 'Girl Illustration',
    },
    {
        id: 9,
        fileName: 'leon-maison-margiela-SS20',
        imageName: 'Leon, Maison Margiela SS20',
    },
    {
        id: 10,
        fileName: 'music-album-poster',
        imageName: 'Music Album Poster',
    },
    {
        id: 11,
        fileName: 'portrait-of-kate',
        imageName: 'Portrait Of Kate',
    },
    {
        id: 12,
        fileName: 'portrait-of-lera',
        imageName: 'Portrait Of Lera',
    },

    {
        id: 13,
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
                item = workItem
            }
        });

        return item;
    };

    return <section className="WorkItemList">
        {mockWorkItems.map((workItem: WorkItem) =>
            <WorkItem key={workItem.id} workItem={workItem}/>)}
        <Switch>
            <Route path={`/work/:fileName`}>
                <WorkItemModal
                    workItemList={mockWorkItems}
                    workItem={getItemByFileName()}/>
            </Route>
        </Switch>
    </section>
};
