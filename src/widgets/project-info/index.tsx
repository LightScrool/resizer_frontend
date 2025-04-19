import React from "react"
import cn from "classnames"
import { ProjectInfo as TProjectInfo } from "../../shared/api"
import styles from './styles.module.scss';
import Button from "../../shared/ui/Button/Button";

type Props = TProjectInfo;

export const ProjectInfo: React.FC<Props> = ({alias, name, description}) => {
    return (
        <>
            <section className={styles.mainInfo}>
                <div>
                    {name ? (
                        <>
                            <h1 className={styles.title}>{name}</h1>
                            <h2 className={cn(styles.subtitle, styles.alias)}>{alias}</h2>
                        </>
                    ) : (
                        <h1 className={cn(styles.title, styles.alias)}>{alias}</h1>
                    )}

                    {description ? (
                        <div className={styles.description}>
                            {description}
                        </div>
                    ): null}
                </div>
                <Button className={styles.button} danger>
                    Удалить проект
                </Button>
            </section>
            <section className={styles.apiKeyBlock}>
                <span>Ключ для доступа по API: {'*'.repeat(32)}</span>
                <Button className={styles.button}>
                    Сбросить ключ
                </Button>
            </section>
        </>
    )
}