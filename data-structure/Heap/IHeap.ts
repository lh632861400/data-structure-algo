
export interface IHeap<E> {

  size(): number;

  isEmpty(): boolean;

  clear(): void;

  add(element: E): void;

  remove(): E;

  replace(element: E): E;

  get(): E;

}

export interface Comparator<E> {
  compare(e1: E, e2: E): number
}

export interface Comparable<E> {
  compareTo(e: E): number
}
