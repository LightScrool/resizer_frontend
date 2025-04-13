const LOCAL_STORAGE_TOKEN_KEY = 'authToken';

export const getTokenFromLs = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (typeof token === 'string' && token) {
        return token;
    }

    return null;
}

export const saveTokenToLs = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
}

export const deleteTokenFromLs = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}