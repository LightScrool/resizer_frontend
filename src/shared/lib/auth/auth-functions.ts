import { YP_API_CLIENT_ID } from "../../config";
import { deleteTokenFromLs } from "./lib/token-storage";
import { deleteUserDataFromLs } from "./lib/user-data-storage";

const YP_API_PATH = 'https://oauth.yandex.ru/authorize';

export const login = () => {
    if (!YP_API_CLIENT_ID) {
        throw new Error('YP_API_CLIENT_ID not stated')
    }
    
    const searchParams = new URLSearchParams({
        response_type: 'token',
        client_id: YP_API_CLIENT_ID,
        redirect_uri: window.location.href
    })

    const authUrl = `${YP_API_PATH}?${searchParams}`;

    window.open(authUrl, '_self');
}

export const logout = () => {
    deleteTokenFromLs();
    deleteUserDataFromLs();
    window.location.reload();
}
