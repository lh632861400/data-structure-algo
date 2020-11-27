
export interface IMap<K, V> {
  size(): number;

  isEmpty(): boolean;

  clear(): void;

  containsKey(key: K): boolean;

  containsValue(value: V): boolean;

  put(key: K, value: V): V;

  get(key: K): V;

  remove(key: K): V

  traversal(visitor: AbstractVisitor<K, V>): void;

}

export abstract class AbstractVisitor<K, V> {
  stop: boolean;
  abstract visit(key: K, value: V): void;
}

export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}

