import {useParams} from "react-router";
import * as React from "react";

export const WorkItemModal = () => {
    let {workName} = useParams();
    return <div>{workName}</div>
};