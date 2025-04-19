import React from "react"
import { useParams } from "react-router-dom"

import CenterPageText from "../../shared/ui/CenterPageText/CenterPageText"
import { NotFoundPage } from "../not-found-page";

export const ProjectPage: React.FC = () => {
    const { projectAlias } = useParams();

    if (!projectAlias) {
        return <NotFoundPage />
    }

    return (
        <CenterPageText>
            Страница проекта {projectAlias}
        </CenterPageText>
    )
}