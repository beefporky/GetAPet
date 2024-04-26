import { useEffect, useRef } from "react"

/**
 * Ignores first render call of useEffect
 * @param fn 
 * @param dependencies 
 */
const useCustomEffect = (fn: () => void, dependencies: string[]) => {
    const customRef = useRef(false);
    useEffect(() => {
        customRef.current = true;
    }, []);

    useEffect(() => {
        if (!customRef.current) {
            return fn();
        } else {
            customRef.current = false;
        }
    }, dependencies);
}

export default useCustomEffect