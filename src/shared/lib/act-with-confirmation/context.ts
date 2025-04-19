import { createContext } from "react";

export type Action = () => (void | Promise<void>);

export type Confirmation = {
    text: string;
    action: Action;
    isDanger?: boolean;
};

type ContextValue = {
    confirmation: Confirmation | null;
    setConfirmation: (value: Confirmation | null) => void;
}

export const actWithConfirmationContext = createContext<ContextValue>({
    confirmation: null,
    setConfirmation: () => {},
});
