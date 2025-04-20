import React, { useState } from "react";
import Button from "../../../../shared/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../entities/redux/app-typing";
import { useResizerBackend } from "../../../../shared/api/hook";
import { fetchUploadImage, selectIsImageUploading } from "../../../../entities/redux/images-list";
import styles from './styles.module.scss';
import { Input } from "../../../../shared/ui/Input/Input";
import { AllowedFilesExtensions } from "../../../../shared/config";

const ACCEPT = Array.from(
    Object.values(AllowedFilesExtensions)
)
    .map((extension) => `.${extension}`)
    .join(', ');

type Props = {
    projectAlias: string;
    onClose: VoidFunction;
}

export const PopupContent: React.FC<Props> = ({ projectAlias, onClose }) => {
    const isLoading = useAppSelector(selectIsImageUploading);

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [file, setFile] = useState<File>();

    const isDisabled = !file;

    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const handleClick = () => {
        if (isDisabled) {
            return;
        }

        dispatch(fetchUploadImage({
            resizerBackend,
            projectAlias,
            body: {
                file,
                name,
                description,
            }
        }))
            .unwrap()
            .then(() => onClose())
    }

    return (
        <>
            <div className={styles.topWrapper}>
                <Input label="Название" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input label="Описание" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className={styles.bottomWrapper}>
                <input
                    type="file"
                    accept={ACCEPT}
                    multiple={false}
                    onChange={(e) => setFile(e.target?.files?.[0])}
                />
                <Button
                    isLoading={isLoading}
                    disabled={isDisabled}
                    onClick={handleClick}
                >
                    Загрузить
                </Button>
            </div>
        </>
    )
}