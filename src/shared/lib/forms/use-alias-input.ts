import { useCallback, useState } from "react";

const REG_EXP = /^[a-z\d-_]{1,50}$/;

export const useAliasInput = (defaultValue?: string) => {
    const [alias, setAlias] = useState<string | undefined>(defaultValue);

    const handleSetAlias = useCallback((alias: string | undefined) => {
        if (!alias) {
            setAlias(undefined);
            return;
        }
        if (REG_EXP.test(alias)) {
            setAlias(alias);
            return;
        }
    }, [setAlias])

    return [alias, handleSetAlias] as const;
}