export type CompareFn<T> = (a: T, b: T) => number;

export function compareByString<T>(fn: (t: T) => string): CompareFn<T> {
  return (a: T, b: T) =>
    (fn(a) || '').toLocaleLowerCase().localeCompare((fn(b) || '').toLocaleLowerCase());
}

export function compareByNumber<T>(fn: (t: T) => number): CompareFn<T> {
  return (a: T, b: T) => (fn(a) || 0) - (fn(b) || 0);
}

export function compareWith<T>(...comparators: CompareFn<T>[]): CompareFn<T> {
  return (a, b) => comparators.reduce((cur, cmp) => cur || cmp(a, b), 0);
}
