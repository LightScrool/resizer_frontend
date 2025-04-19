import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useResizerBackend } from "../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { fetchProjectInfo, selectFetchProjectInfoStatus, selectProjectInfo } from "../../entities/redux/project-info";
import { RequestStatuses } from "../../shared/lib/network";
import { LoaderPage } from "../loader-page";
import { ErrorPage } from "../error-page";
import { ProjectInfo } from "../../widgets/project-info";

export const ProjectPage: React.FC = () => {
    const projectAlias = useParams().projectAlias || '';

    const resizerBackend = useResizerBackend();
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProjectInfo({resizerBackend, projectAlias}))
    }, [dispatch, resizerBackend, projectAlias])
    
    const fetchStatus = useAppSelector(selectFetchProjectInfoStatus);
    const projectInfo = useAppSelector(selectProjectInfo);

    if (fetchStatus === RequestStatuses.IDLE || fetchStatus === RequestStatuses.PENDING) {
        return (
            <LoaderPage />
        )
    }

    if (fetchStatus === RequestStatuses.FAILED || !projectInfo) {
        return (
            <ErrorPage />
        )
    }

    return (
        <ProjectInfo {...projectInfo} />
    )
}