import React, { useEffect } from "react";

import styles from './styles.module.scss';
import { Loader } from "../../../../shared/ui/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";
import { clearApiKey, fetchApiKey, selectApiKey, selectIsApiKeyLoading } from "../../../../entities/redux/project-api-key";
import { useResizerBackend } from "../../../../shared/api/hook";

const PLACEHOLDER = '*'.repeat(32);

type Props = {
    projectAlias: string;
}

export const ApiKey: React.FC<Props> = ({ projectAlias }) => {
    const isLoading = useAppSelector(selectIsApiKeyLoading);
    const apiKey = useAppSelector(selectApiKey);

    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const handleFetchApiKey = () => {
        dispatch(fetchApiKey({ resizerBackend, projectAlias }))
    }

    const handleCopyValue = () => {
        if (!apiKey) {
            return;
        }
        navigator.clipboard.writeText(apiKey);
    }

    useEffect(() => {
        return () => {
            dispatch(clearApiKey());
        }
    }, [dispatch])

    return (
        <div className={styles.root}>
            <span>Ключ для доступа по API: </span>
            {
                isLoading ? (
                    <div className={styles.loaderWrapper}>
                        <Loader size='s'/>
                    </div>
                ) : (
                    apiKey ? (
                        <button 
                            className={styles.textButton}
                            onClick={handleCopyValue}
                        >
                            {apiKey}
                        </button>
                    ) : (
                        <button 
                            className={styles.textButton}
                            onClick={handleFetchApiKey}
                        >
                            {PLACEHOLDER}
                        </button>
                    )
                )
            }
        </div>
    )
}