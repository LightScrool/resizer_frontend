import { createContext } from "react";
import { UserData } from "../types";

export type AuthContextValue = {
    isAuth: false;
    token: string | null;
    isLoading: boolean;
    userData: UserData | null;
} | {
    isAuth: true;
    token: string;
    isLoading: boolean;
    userData: UserData;
}

export const authContext = createContext<AuthContextValue>({
    isAuth: false,
    token: null,
    isLoading: false,
    userData: null,
})