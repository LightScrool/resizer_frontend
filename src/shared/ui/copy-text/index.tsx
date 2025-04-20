import React from "react"
import cn from "classnames"

import styles from './styles.module.scss';

type Props = {
    className?: string;
    text: string;
}

export const CopyText: React.FC<Props> = ({ className, text }) => {
    const handleCopyValue = () => {
        navigator.clipboard.writeText(text);
    }

    return (
        <button 
            className={cn(className, styles.root)}
            onClick={handleCopyValue}
        >
            {text}
        </button>
    )
}