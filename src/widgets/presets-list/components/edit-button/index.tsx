import React from "react"
import cn from "classnames"

import icon from './assets/pen-to-square-regular.svg';
import styles from './styles.module.scss';

type Props = {
    className?: string;
}

export const EditButton: React.FC<Props> = ({ className }) => {
    return (
        <button className={cn(className, styles.button)}>
            <img className={styles.icon} src={icon} />
        </button>
    )
}