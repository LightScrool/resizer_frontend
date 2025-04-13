import { UserData } from "../types";

const LOCAL_STORAGE_USER_DATA_KEY = 'userData';

export const saveUserDataToLs = (userData: UserData) => {
    localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(userData));
}

export const deleteUserDataFromLs = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
}

export const getUserDataFromLs = (): UserData | null => {
    try {
        const parsedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY) || 'null');

        if (!parsedData || typeof parsedData !== 'object') {
            throw new Error();
        }

        if (!parsedData.name || typeof parsedData.name !== 'string') {
            throw new Error();
        }

        if (!parsedData.avatarUrl || typeof parsedData.avatarUrl !== 'string') {
            throw new Error();
        }

        return {
            name: parsedData.name,
            avatarUrl: parsedData.avatarUrl,
        }
    } catch {
        deleteUserDataFromLs();
        return null;
    }
}
