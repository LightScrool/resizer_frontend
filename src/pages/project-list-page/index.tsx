import React from "react"
import { Link } from "react-router-dom";

import { useUserProjects } from "./lib/use-user-projects";
import { LoaderPage } from "../loader-page";
import { ErrorPage } from "../error-page";
import { CreateProjectButton } from "../../entities/create-project-button";

import styles from './styles.module.scss';

export const ProjectListPage: React.FC = () => {
    const [data, isLoading] = useUserProjects();

    if (isLoading) {
        return (
            <LoaderPage />
        )
    }

    if (!data) {
        return (
            <ErrorPage />
        )
    }

    return (
        <section>
            <div className={styles.topWrapper}>
                <div className={styles.counter}>
                    Количество проектов: {data.projects.length}/{data.projectsLimit}
                </div>
                <CreateProjectButton isDisabled={data.projects.length >= data.projectsLimit}/>
            </div>
            <ul className={styles.projectList}>
                {data.projects.map(project => (
                    <li key={project.alias}>
                        <Link className={styles.projectCard} to={`/projects/${project.alias}`}>
                            <div className={styles.projectCard__titleBlock}>
                                {project.name && (<span>{project.name}</span>)}
                                <span className={styles.projectCard__alias}>{project.alias}</span>
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
        </section>
    )
}