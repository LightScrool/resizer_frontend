import React from "react"

import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText"
import { Loader } from '../../shared/ui/Loader/Loader';

type Props = {
    maxHeight?: number;
}

export const LoaderPage: React.FC<Props> = ({maxHeight}) => {
    return (
        <CenterPageText maxHeight={maxHeight}>
            <Loader size="l"/>
        </CenterPageText>
    )
}