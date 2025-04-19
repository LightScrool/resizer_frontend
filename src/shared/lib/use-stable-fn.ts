import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStableFn = <Fn extends (...args: Array<any>) => any>(fn :Fn): Fn => {
    const ref = useRef<{fn: Fn; stableFn: Fn}>({
        fn,
        stableFn: ((...args) => ref.current.fn(...args)) as Fn,
    });

    ref.current.fn = fn;

    return ref.current.stableFn;
};
