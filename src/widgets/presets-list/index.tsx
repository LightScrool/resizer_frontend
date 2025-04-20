import React from "react";
import { useAppSelector } from "../../entities/redux/app-typing";
import { presetsSelectors } from "../../entities/redux/presets-list";
import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText";
import { Loader } from "../../shared/ui/Loader/Loader";
import { RequestStatuses, uniteRequestStatuses } from "../../shared/lib/network";
import { RemovePresetButton } from "./components/remove-preset-button";
import { EditPresetButton, EditPresetPopupSlot } from "./components/edit-preset";

import styles from './styles.module.scss';
import { CopyText } from "../../shared/ui/copy-text";

const PLACEHOLDERS_MAX_HEIGHT = 250;

type Props = {
    projectAlias: string;
}

export const PresetsList: React.FC<Props> = ({projectAlias}) => {
    const presets = useAppSelector(presetsSelectors.selectAll);
    
    if (!presets.length) {
        return (
            <CenterPageText maxHeight={PLACEHOLDERS_MAX_HEIGHT} size="m">
                В проекте пока нет пресетов
            </CenterPageText>
        )
    }

    return (
        <ul className={styles.presetsList}>
            {presets.map(preset => (
                <li key={preset.alias} className={styles.presetCard}>
                    <div>
                        <div className={styles.presetCard__titleBlock}>
                            <span className={styles.presetCard__alias}>
                                <CopyText text={preset.alias} />
                            </span>
                            {preset.name && (<span className={styles.presetCard__name}>{preset.name}</span>)}
                        </div>
                        {preset.description && (
                            <div className={styles.presetCard__description}>
                                {preset.description}
                            </div>
                        )}
                        <div className={styles.presetCard__params}>
                            <div>Размер: {preset.size}</div>
                            <div>Ориентация: {preset.isHorizontal ? 'Горизонтальная' : 'Вертикальная'}</div>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <EditPresetPopupSlot
                            projectAlias={projectAlias}
                            presetAlias={preset.alias}
                        />
                        {uniteRequestStatuses(preset.fetchEditStatus, preset.fetchRemoveStatus) === RequestStatuses.PENDING ? (
                            <Loader size="s"/>
                        ): (
                            <>
                                <EditPresetButton
                                    className={styles.actions__item}
                                    presetAlias={preset.alias}
                                />
                                <RemovePresetButton
                                    className={styles.actions__item}
                                    projectAlias={projectAlias}
                                    presetAlias={preset.alias}
                                />
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}