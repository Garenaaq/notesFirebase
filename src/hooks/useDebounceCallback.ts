/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay = 250
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced;
};
