import React from "react";
import './WorkItem.scss';
import {Link} from "react-router-dom";

interface WorkItemProps {
    fileName: string,
    imageName: string
}

export const WorkItem = ({imageName, fileName}: WorkItemProps) => {

    const toSeoUrl = (url: string): string => {
        return url.toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
            .replace(/&/g, '-and-')
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-*/, '')
            .replace(/-*$/, '');
    };

    return <div className="WorkItem">
        <Link className={'WorkItem__image-wrap'} to={`/work/${toSeoUrl(imageName)}`}>
            <img className={'WorkItem__image'} src={require(`../../images/${fileName}`)} alt={imageName}/>
        </Link>
        <h2 className={'WorkItem__desc'}>{imageName}</h2>
    </div>
};