import React, {useState} from "react";
import './WorkItem.scss';
import {Link} from "react-router-dom";
import {toSeoUrl} from "../../../utils/toSeoUrl";
import {Category} from "../../../App";

export interface WorkItem {
    _id: number,
    title: string,
    image: string,
    thumbnail: string,
    color: string,
    category: string
}

interface WorkItemProps extends WorkItem {
    currentCategory: Category
}

export const WorkItem = ({_id, title, image, thumbnail, currentCategory}: WorkItemProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const showDescOverlay = () => {
        return <div className={'WorkItem__desc-overlay'}>
            <div className={'WorkItem__desc'}>{title}</div>
        </div>;
    };

    const showPlaceholder = () => {
        return <div className={'WorkItem__placeholder'}/>;
    };

    const getToUrl = () => {
        if (currentCategory) {
            return `${currentCategory}/${toSeoUrl(title)}`;
        } else {
            return `/work/${toSeoUrl(title)}`;
        }
    };

    return <div className="WorkItem">
        <Link className={'WorkItem__image-wrap'}
              to={getToUrl()}>
            <img className={'WorkItem__image'}
                 onLoad={() => setImageLoaded(true)}
                 src={thumbnail}
                 alt={`Vernal Bloom - ${title}`}/>
            {imageLoaded && showDescOverlay()}
            {!imageLoaded && showPlaceholder()}
        </Link>
    </div>
};