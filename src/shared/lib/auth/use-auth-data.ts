import { useContext } from "react"

import { authContext } from "./lib/context"

export const useAuthData = () => {
    return useContext(authContext);
}