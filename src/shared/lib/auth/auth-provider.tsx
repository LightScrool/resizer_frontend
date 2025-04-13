import React, { PropsWithChildren, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useToken } from './lib/use-token';
import { useUserData } from './lib/use-user-data';
import { authContext, AuthContextValue } from './lib/context';
import { UserData } from '../../api/types';
import { ResizerBackendClient } from '../../api';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useToken();    

    useLayoutEffect(() => {
        const parsedToken = /access_token=([^&]+)/.exec(hash)?.[1];
    
        if (!parsedToken) {
            return;
        }

        navigate({hash: ''});
        setToken(parsedToken);
    }, [hash, navigate, setToken]);  

    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useUserData();

    useLayoutEffect(() => {
        if (!token) {
            return;
        }

        setIsLoading(true);

        const resizerBackendClient = new ResizerBackendClient({ authToken: token });

        resizerBackendClient.getUserData()
            .then((userData) => {
                setUserData(userData as UserData)
            })
            .catch(() => {
                setToken(null);
                setUserData(null);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [setToken, setUserData, token])

    const value = useMemo<AuthContextValue>(() => {
        if (userData && token) {
            return {
                isAuth: true,
                token,
                isLoading,
                userData,
            };
        }
        return {
            isAuth: false,
            token,
            isLoading,
            userData,
        }
    }, [isLoading, token, userData])
      
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}