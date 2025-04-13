import { useCallback, useState } from "react";
import { getTokenFromLs, saveTokenToLs, deleteTokenFromLs } from './token-storage';

export const useToken = () => {
    const [token, setToken] = useState(() => getTokenFromLs());

    const handleSetToken = useCallback((token: string | null) => {
        setToken(token);

        if (token) {
            saveTokenToLs(token);
        } else {
            deleteTokenFromLs();
        }
    }, [setToken])

    return [token, handleSetToken] as const;
}