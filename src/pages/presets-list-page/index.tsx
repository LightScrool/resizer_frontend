import React, { useEffect } from "react";
import { useResizerBackend } from "../../shared/api/hook";
import { useAppDispatch, useAppSelector } from "../../entities/redux/app-typing";
import { fetchPresetsList, presetsSelectors, selectFetchPresetsListStatus } from "../../entities/redux/presets-list";
import { useParams } from "react-router-dom";
import { RequestStatuses, uniteRequestStatuses } from "../../shared/lib/network";
import { LoaderPage } from "../loader-page";
import { ErrorPage } from "../error-page";
import { selectFetchProjectInfoStatus, selectProjectInfo } from "../../entities/redux/project-info";
import { PresetsList } from "../../widgets/presets-list";
import styles from './styles.module.scss';
import { CreateProjectButton } from "../../widgets/create-project-button";

const PLACEHOLDERS_MAX_HEIGHT = 250;

export const PresetsListPage: React.FC = () => {
    const projectAlias = useParams().projectAlias || '';
    
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();
    
    useEffect(() => {
        dispatch(fetchPresetsList({resizerBackend, projectAlias}))
    }, [dispatch, resizerBackend, projectAlias])
    
    const fetchStatus = uniteRequestStatuses(
        useAppSelector(selectFetchProjectInfoStatus),
        useAppSelector(selectFetchPresetsListStatus),
    );
    const projectInfo = useAppSelector(selectProjectInfo);
    const presets = useAppSelector(presetsSelectors.selectAll);

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
                    Количество пресетов: {presets.length}/{projectInfo.presetsLimit}
                </div>
                <CreateProjectButton isDisabled={presets.length >= projectInfo.presetsLimit}/>
            </div>
            <PresetsList />
        </>
    )
}