import React from "react"
import Button from "../../../../shared/ui/Button/Button";
import { useActWithConfirmation } from "../../../../shared/lib/act-with-confirmation";

type Props = {
    className?: string;
}

export const RefreshApiKeyButton: React.FC<Props> = ({className}) => {
    const actWithConfirmation = useActWithConfirmation();

    const handleClick = () => {
        actWithConfirmation(
            'Вы уверены, что хотите сбросить ключ доступа?', 
            async () => {
                await new Promise(r => setTimeout(r, 1000));
                alert(123);
            }
        )
    }

    return (
        <Button className={className} onClick={handleClick}>
            Сбросить ключ
        </Button>
    )
}