import React from "react"
import { Outlet, useParams } from "react-router-dom"

import { ProjectInfo } from "../../widgets/project-info";
import { Tabs } from "./components/tabs";

import styles from './styles.module.scss';
import { NotFoundPage } from "../not-found-page";

export const ProjectPage: React.FC = () => {
    const projectAlias = useParams().projectAlias;
    
    if (!projectAlias) {
        return <NotFoundPage />
    }

    return (
        <>
            <ProjectInfo projectAlias={projectAlias} />
            <Tabs className={styles.tabs} projectAlias={projectAlias} />
            <Outlet />   
        </>
    )
}