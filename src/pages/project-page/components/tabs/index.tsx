import React from "react"
import { Link, useLocation } from "react-router-dom"
import cn from 'classnames';

import styles from './styles.module.scss';

type TabName = 'presets' | 'images';

type Tab = {
    tabName: TabName;
    label: string;
}

const DEFAULT_TAB = 'presets' satisfies TabName;

const TABS: Tab[] = [
    {
        tabName: 'presets',
        label: 'Пресеты'
    },
    {
        tabName: 'images',
        label: 'Изображения'
    },
]

const REG_EXP = /\/projects\/[^/]+\/([^/]*)?$/

type Props = {
    className?: string;
    projectAlias: string;
}

export const Tabs: React.FC<Props> = ({className, projectAlias}) => {
    const { pathname } = useLocation();
    
    const currentTab = REG_EXP.exec(pathname)?.[1] || DEFAULT_TAB;

    return (
        <div className={cn(className, styles.tabs)}>
            {TABS.map((tab) => (
                <Link 
                    key={tab.tabName}
                    className={cn(styles.tab, tab.tabName === currentTab && styles.tab_active)}
                    to={`/projects/${projectAlias}/${tab.tabName}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    )
}