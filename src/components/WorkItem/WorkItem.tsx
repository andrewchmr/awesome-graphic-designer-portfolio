import React, {useState} from "react";
import './WorkItem.scss';
import {Link} from "react-router-dom";
import {toSeoUrl} from "../../utils/toSeoUrl";

export interface WorkItem {
    id: number,
    fileName: string,
    imageName: string
}

interface WorkItemProps {
    workItem: WorkItem,
    onClick: (item: WorkItem) => void
}

export const WorkItem = ({workItem, onClick}: WorkItemProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const showImageOverlay = () => {
        return <div className={'WorkItem__desc-overlay'}>
            <div className={'WorkItem__desc'}>{workItem.imageName}</div>
        </div>;
    };

    const showPlaceholder = () => {
        return <div className={'WorkItem__placeholder'}/>;
    };

    return <div className="WorkItem">
        <Link className={'WorkItem__image-wrap'} onClick={() => onClick(workItem)}
              to={`/work/${toSeoUrl(workItem.imageName)}`}>
            <img className={'WorkItem__image'} onLoad={() => setImageLoaded(true)}
                 src={require(`../../images/${workItem.fileName}-sm.jpg`)}
                 alt={`Vernal Bloom - ${workItem.imageName}`}/>
            {imageLoaded && showImageOverlay()}
            {!imageLoaded && showPlaceholder()}
        </Link>
    </div>
};