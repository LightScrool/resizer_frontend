import { useMemo } from "react";
import { useAuthData } from "../lib/auth";
import { ResizerBackendClient } from "./resizer-backend-client"

export const useResizerBackend = () => {
    const authData = useAuthData();

    return useMemo(() => {
        if (!authData.isAuth) {
            return new ResizerBackendClient({ authToken: null });
        }

        return new ResizerBackendClient({ authToken: authData.token});
    }, [authData])
}