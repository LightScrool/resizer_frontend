import React from "react"
import Button from "../../../../shared/ui/Button/Button";
import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";
import { useAppDispatch } from "../../../../entities/redux/app-typing";
import { fetchRemoveProject } from "../../../../entities/redux/project-info";
import { useResizerBackend } from "../../../../shared/api/hook";
import { useNavigate } from "react-router-dom";

type Props = {
    projectAlias: string;
    className?: string;
}

export const DeleteProjectButton: React.FC<Props> = ({className, projectAlias}) => {
    const actWithConfirmation = useActWithConfirmation();
    const dispatch = useAppDispatch();
    const resizerBackend = useResizerBackend();

    const navigate = useNavigate();
    
    const handleClick = () => {
        actWithConfirmation(
            'Вы уверены, что хотите удалить проект?',
            () => dispatch(fetchRemoveProject({ resizerBackend, projectAlias }))
                .unwrap()
                .then(() => navigate('/')),
            true,
        )
    }

    return (
        <Button className={className} preset="danger" onClick={handleClick}>
            Удалить проект
        </Button>
    )
}