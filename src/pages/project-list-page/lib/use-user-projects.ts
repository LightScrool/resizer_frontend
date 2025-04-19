import { useEffect, useState } from "react";
import { useResizerBackend } from "../../../shared/api/hook";
import { UserProjects } from "../../../shared/api";

export const useUserProjects = () => {
    const resizerBackend = useResizerBackend();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<UserProjects | null>(null);

    useEffect(() => {
        setIsLoading(true);
        resizerBackend.getUserProjects()
            .then((data) => setData(data))
            .finally(() => setIsLoading(false))
    }, [])

    return [data, isLoading] as const;
}