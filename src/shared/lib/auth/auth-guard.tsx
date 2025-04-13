import React, { PropsWithChildren, ReactNode } from "react";
import { useAuthData } from "./use-auth-data";

type Props = {
    loader: ReactNode;
    noAuth: ReactNode;
}

export const AuthGuard: React.FC<PropsWithChildren<Props>> = ({ children, loader, noAuth }) => {
    const authData = useAuthData();

    if (authData.isAuth) {
        return <>{children}</>
    }

    if (authData.isLoading) {
        return <>{loader}</>
    }

    return <>{noAuth}</>
}