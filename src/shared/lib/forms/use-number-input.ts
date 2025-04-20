import { useCallback, useState } from "react";

export const useNumberInput = () => {
    const [value, setValue] = useState<number>();

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