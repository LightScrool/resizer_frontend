import React, { useEffect } from "react";
import { useResizerBackend } from "../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { useParams } from "react-router-dom";
import { RequestStatuses, uniteRequestStatuses } from "../../shared/lib/network";
import { LoaderPage } from "../loader-page";
import { ErrorPage } from "../error-page";
import { selectFetchProjectInfoStatus, selectProjectInfo } from "../../entities/redux/project-info";
import styles from './styles.module.scss';
import { fetchImagesList, imagesSelectors, selectFetchImagesListStatus } from "../../entities/redux/images-list";
import { AddImageButton } from "./components/add-image-button";
import { ImagesList } from "../../widgets/images-list";

const PLACEHOLDERS_MAX_HEIGHT = 250;

export const ImagesListPage: React.FC = () => {
    const projectAlias = useParams().projectAlias || '';
    
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();
    
    useEffect(() => {
        dispatch(fetchImagesList({resizerBackend, projectAlias}))
    }, [dispatch, resizerBackend, projectAlias])
    
    const fetchStatus = uniteRequestStatuses(
        useAppSelector(selectFetchProjectInfoStatus),
        useAppSelector(selectFetchImagesListStatus),
    );

    const projectInfo = useAppSelector(selectProjectInfo);
    const images = useAppSelector(imagesSelectors.selectAll);

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
        <>
            <div className={styles.topWrapper}>
                <div className={styles.counter}>
                    Количество изображений: {images.length}/{projectInfo.presetsLimit}
                </div>
                <AddImageButton projectAlias={projectAlias} isDisabled={images.length >= projectInfo.presetsLimit}/>
            </div>
            <ImagesList projectAlias={projectAlias}/>
        </>
    )
}