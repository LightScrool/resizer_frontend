import { useCallback, useState } from "react";
import { getUserDataFromLs, saveUserDataToLs, deleteUserDataFromLs } from './user-data-storage';
import { UserData } from "../../../api/types";

export const useUserData = () => {
    const [userData, setUserData] = useState<UserData | null>(() => getUserDataFromLs());

    const handleSetUserData = useCallback((userData: UserData | null) => {
        setUserData(userData);

        if (userData) {
            saveUserDataToLs(userData);
        } else {
            deleteUserDataFromLs();
        }
    }, [setUserData])

    return [userData, handleSetUserData] as const;
}