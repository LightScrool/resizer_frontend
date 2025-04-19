import React, { useEffect } from "react"
import cn from "classnames"
import styles from './styles.module.scss';
import { useResizerBackend } from "../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { fetchProjectInfo, selectFetchProjectInfoStatus, selectProjectInfo } from "../../entities/redux/project-info";
import { RequestStatuses } from "../../shared/lib/network";
import { LoaderPage } from "../../pages/loader-page";
import { ErrorPage } from "../../pages/error-page";
import { ApiKey } from "./components/api-key";
import { RefreshApiKeyButton } from "./components/refresh-api-key-button";
import { DeleteProjectButton } from "./components/delete-project-button";

const PLACEHOLDERS_MAX_HEIGHT = 182;

type Props = {
    projectAlias: string;
};

export const ProjectInfo: React.FC<Props> = ({ projectAlias }) => {
    const resizerBackend = useResizerBackend();
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProjectInfo({resizerBackend, projectAlias}))
    }, [dispatch, resizerBackend, projectAlias])
    
    const fetchStatus = useAppSelector(selectFetchProjectInfoStatus);
    const projectInfo = useAppSelector(selectProjectInfo);

    if (fetchStatus === RequestStatuses.IDLE || fetchStatus === RequestStatuses.PENDING) {
        return (
            <LoaderPage maxHeight={PLACEHOLDERS_MAX_HEIGHT} />
        )
    }

    if (fetchStatus === RequestStatuses.FAILED || !projectInfo) {
        return (
            <ErrorPage maxHeight={PLACEHOLDERS_MAX_HEIGHT} />
        )
    }

    return (
        <section>
            <div className={styles.mainInfo}>
                <div>
                    {projectInfo.name ? (
                        <>
                            <h1 className={styles.title}>{projectInfo.name}</h1>
                            <h2 className={cn(styles.subtitle, styles.alias)}>{projectInfo.alias}</h2>
                        </>
                    ) : (
                        <h1 className={cn(styles.title, styles.alias)}>{projectInfo.alias}</h1>
                    )}

                    {projectInfo.description ? (
                        <div className={styles.description}>
                            {projectInfo.description}
                        </div>
                    ): null}
                </div>
                <DeleteProjectButton className={styles.button} projectAlias={projectInfo.alias} />
            </div>
            <div className={styles.apiKeyBlock}>
                <ApiKey projectAlias={projectInfo.alias} />
                <RefreshApiKeyButton className={styles.button} projectAlias={projectInfo.alias} />
            </div>
        </section>
    )
}