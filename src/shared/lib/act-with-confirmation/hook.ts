import { useContext } from "react";
import { Action, actWithConfirmationContext } from "./context";

export const useActWithConfirmation = () => {
    const {setConfirmation} = useContext(actWithConfirmationContext);

    return (text: string, action: Action, isDanger?: boolean) => {
        setConfirmation({
            text,
            action,
            isDanger,
        })
    }
};