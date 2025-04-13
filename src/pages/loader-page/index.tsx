import React from "react"

import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText"
import { Loader } from '../../shared/ui/Loader/Loader';

export const LoaderPage: React.FC = () => {
    return (
        <CenterPageText>
            <Loader size="l"/>
        </CenterPageText>
    )
}