import React, {useState} from "react";
import './WorkItem.scss';
import {Link} from "react-router-dom";
import {toSeoUrl} from "../../../utils/toSeoUrl";

export interface WorkItem {
    id: number,
    fileName: string,
    imageName: string
}

export const WorkItem = ({id, fileName, imageName}: WorkItem) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const showDescOverlay = () => {
        return <div className={'WorkItem__desc-overlay'}>
            <div className={'WorkItem__desc'}>{imageName}</div>
        </div>;
    };

    const showPlaceholder = () => {
        return <div className={'WorkItem__placeholder'}/>;
    };

    return <div className="WorkItem">
        <Link className={'WorkItem__image-wrap'}
              to={`/work/${toSeoUrl(imageName)}`}>
            <img className={'WorkItem__image'} onLoad={() => setImageLoaded(true)}
                 src={require(`../../../images/${fileName}-sm.jpg`)}
                 alt={`Vernal Bloom - ${imageName}`}/>
            {imageLoaded && showDescOverlay()}
            {!imageLoaded && showPlaceholder()}
        </Link>
    </div>
};