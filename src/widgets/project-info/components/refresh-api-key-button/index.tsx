import React from "react"
import Button from "../../../../shared/ui/Button/Button";
import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { fetchRefreshApiKey } from "../../../../entities/redux/project-api-key";
import { useResizerBackend } from "../../../../shared/api/hook";

type Props = {
    projectAlias: string;
    className?: string;
}

export const RefreshApiKeyButton: React.FC<Props> = ({className, projectAlias}) => {
    const actWithConfirmation = useActWithConfirmation();
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();
    
    const handleClick = () => {
        actWithConfirmation(
            'Вы уверены, что хотите сбросить ключ доступа?',
            () => dispatch(fetchRefreshApiKey({ resizerBackend, projectAlias })).unwrap()
        )
    }

    return (
        <Button className={className} onClick={handleClick}>
            Сбросить ключ
        </Button>
    )
}