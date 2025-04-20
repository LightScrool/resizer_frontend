import React, { useEffect } from "react"
import { Link } from "react-router-dom";

import { LoaderPage } from "../loader-page";
import { ErrorPage } from "../error-page";
import { CreateProjectButton } from "../../widgets/create-project-button";

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { fetchProjectsList, selectFetchProjectsListStatus, selectProjectsLimit, projectsSelectors } from "../../entities/redux/projects-list";
import { useResizerBackend } from "../../shared/api/hook";
import { RequestStatuses } from "../../shared/lib/network";
import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText";

export const ProjectListPage: React.FC = () => {
    const resizerBackend = useResizerBackend();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProjectsList({resizerBackend}))
    }, [dispatch, resizerBackend])
    
    const fetchStatus = useAppSelector(selectFetchProjectsListStatus);
    const projectsLimit = useAppSelector(selectProjectsLimit);
    const projects = useAppSelector(projectsSelectors.selectAll);

    if (fetchStatus === RequestStatuses.IDLE || fetchStatus === RequestStatuses.PENDING) {
        return (
            <LoaderPage />
        )
    }

    if (fetchStatus === RequestStatuses.FAILED || typeof projectsLimit !== 'number') {
        return (
            <ErrorPage />
        )
    }

    return (
        <section>
            <div className={styles.topWrapper}>
                <div className={styles.counter}>
                    Количество проектов: {projects.length}/{projectsLimit}
                </div>
                <CreateProjectButton isDisabled={projects.length >= projectsLimit}/>
            </div>
            {projects.length ? (
                <ul className={styles.projectList}>
                    {projects.map(project => (
                        <li key={project.alias}>
                            <Link className={styles.projectCard} to={`/projects/${project.alias}`}>
                                <div className={styles.projectCard__titleBlock}>
                                    <span className={styles.projectCard__alias}>{project.alias}</span>
                                    {project.name && (<span className={styles.projectCard__name}>{project.name}</span>)}
                                </div>
                                {project.description && (
                                    <div className={styles.projectCard__description}>
                                        {project.description}
                                    </div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <CenterPageText maxHeight={400} size="m">
                    У вас пока нет проектов
                </CenterPageText>
            )}
        </section>
    )
}