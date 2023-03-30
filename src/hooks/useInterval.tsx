import { useEffect, useMemo } from 'react';

export function useInterval(callback: () => any, time: number, deps: any[] = []) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cb = useMemo(() => callback, [callback, ...deps]);
    useEffect(() => {
        const interval = setInterval(cb, time);
        cb();
        return () => clearInterval(interval);
    }, [cb, time]);
}
