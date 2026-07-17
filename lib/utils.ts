import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastTime = 0;
  let lastResult: ReturnType<T> | undefined;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      lastResult = fn(...args);
      return lastResult;
    }
    return lastResult;
  };
}
