import { useAppSelector } from "../../entities/redux/app-typing";
import { presetsSelectors } from "../../entities/redux/presets-list";
import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText";

import styles from './styles.module.scss';

const PLACEHOLDERS_MAX_HEIGHT = 250;

export const PresetsList = () => {
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
                <li key={preset.alias}>
                    <div className={styles.presetCard}>
                        <div className={styles.presetCard__titleBlock}>
                            <span className={styles.presetCard__alias}>{preset.alias}</span>
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
                </li>
            ))}
        </ul>
    )
}