import React from "react";
import { useAppSelector } from "../../entities/redux/app-typing";
import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText";
import { Loader } from "../../shared/ui/Loader/Loader";
import { RequestStatuses } from "../../shared/lib/network";
import { RemoveImageButton } from "./components/remove-image-button";

import styles from './styles.module.scss';
import { imagesSelectors } from "../../entities/redux/images-list";

const PLACEHOLDERS_MAX_HEIGHT = 250;

type Props = {
    projectAlias: string;
}

export const ImagesList: React.FC<Props> = ({projectAlias}) => {
    const images = useAppSelector(imagesSelectors.selectAll);
    
    if (!images.length) {
        return (
            <CenterPageText maxHeight={PLACEHOLDERS_MAX_HEIGHT} size="m">
                В проекте пока нет изображений
            </CenterPageText>
        )
    }

    return (
        <ul className={styles.imagesList}>
            {images.map(image => (
                <li key={image.id} className={styles.imageCard}>
                    <div>
                        <div className={styles.imageCard__titleBlock}>
                            <span className={styles.imageCard__alias}>{image.id}</span>
                            {image.name && (<span className={styles.imageCard__name}>{image.name}</span>)}
                        </div>
                        {image.description && (
                            <div className={styles.imageCard__description}>
                                {image.description}
                            </div>
                        )}
                        <img className={styles.imageCard__image} src={image.link}/>
                    </div>
                    <div className={styles.actions}>
                        {image.fetchRemoveStatus === RequestStatuses.PENDING ? (
                            <Loader size="s"/>
                        ): (
                            <RemoveImageButton
                                className={styles.actions__item}
                                projectAlias={projectAlias}
                                presetAlias={image.id}
                            />
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}