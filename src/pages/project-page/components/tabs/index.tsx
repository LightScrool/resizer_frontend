import React from "react"
import { Link, useLocation } from "react-router-dom"
import cn from 'classnames';

import styles from './styles.module.scss';

type Tab = {
    pathEnd: string;
    label: string;
}

const TABS: Tab[] = [
    {
        pathEnd: 'presets',
        label: 'Пресеты'
    },
    {
        pathEnd: 'images',
        label: 'Изображения'
    },
]

type Props = {
    className?: string;
    projectAlias: string;
}

export const Tabs: React.FC<Props> = ({className, projectAlias}) => {
    const { pathname } = useLocation();
    
    const pathEnd = pathname.split('/').pop();

    return (
        <div className={cn(className, styles.tabs)}>
            {TABS.map((tab) => (
                <Link 
                    key={tab.pathEnd}
                    className={cn(styles.tab, tab.pathEnd === pathEnd && styles.tab_active)}
                    to={`/projects/${projectAlias}/${tab.pathEnd}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    )
}