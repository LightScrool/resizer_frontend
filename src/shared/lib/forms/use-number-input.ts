import { useCallback, useState } from "react";

export const useNumberInput = (defaultValue: number | undefined) => {
    const [value, setValue] = useState<number | undefined>(defaultValue);

    const handleSetValue = useCallback((value: string | undefined) => {
        if (!value) {
            setValue(undefined);
            return;
        }
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
            setValue(num);
            return;
        }
    }, [setValue])

    return [value, handleSetValue] as const;
}