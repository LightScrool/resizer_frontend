import React from "react"

import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText"

type Props = {
    maxHeight?: number;
}

export const ErrorPage: React.FC<Props> = ({maxHeight}) => {
    return (
        <CenterPageText maxHeight={maxHeight}>
            Что-то пошло не так...
        </CenterPageText>
    )
}