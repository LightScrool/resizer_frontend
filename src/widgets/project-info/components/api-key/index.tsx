import React, { useEffect } from "react";

import styles from './styles.module.scss';
import { Loader } from "../../../../shared/ui/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";
import { clearApiKey, fetchApiKey, selectApiKey, selectIsApiKeyLoading } from "../../../../entities/redux/project-api-key";
import { useResizerBackend } from "../../../../shared/api/hook";
import { CopyText } from "../../../../shared/ui/copy-text";
import { RESIZER_BACKEND_URL } from "../../../../shared/config";

const PLACEHOLDER = '*'.repeat(32);

type Props = {
    projectAlias: string;
}

const SWAGGER_URL = [RESIZER_BACKEND_URL, 'swagger'].join('/');

export const ApiKey: React.FC<Props> = ({ projectAlias }) => {
    const isLoading = useAppSelector(selectIsApiKeyLoading);
    const apiKey = useAppSelector(selectApiKey);

    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const handleFetchApiKey = () => {
        dispatch(fetchApiKey({ resizerBackend, projectAlias }))
    }

    useEffect(() => {
        return () => {
            dispatch(clearApiKey());
        }
    }, [dispatch])

    return (
        <div className={styles.root}>
            <div>
                <span>Сервис поддерживает внешний API, подробнее в </span>
                <a 
                    href={SWAGGER_URL}
                    target="_blank"
                    rel="noopener noreferer"
                >
                    Swagger
                </a>
            </div>
            <div>
            <span>Ключ для доступа: </span>
            {
                isLoading ? (
                    <div className={styles.loaderWrapper}>
                        <Loader size='s'/>
                    </div>
                ) : (
                    apiKey ? (
                        <CopyText text={apiKey} />
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
        </div>
    )
}