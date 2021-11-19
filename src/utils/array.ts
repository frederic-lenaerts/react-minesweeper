type ValueFn<T> = (index: number, array: T[]) => T;

export function initArray(length: number): undefined[];
export function initArray<T>(length: number, valueFn: ValueFn<T>): T[];
export function initArray<T>(length: number, value: T): T[];
export function initArray<T>(length: number, arg?: T | ValueFn<T>) {
  const array = Array.of<T | undefined>();
  for (let index = 0; index < length; index++) {
    if (typeof arg === "function") {
      array.push((arg as ValueFn<T>)(index, array as T[]));
    } else {
      array.push(arg);
    }
  }
  return array;
}