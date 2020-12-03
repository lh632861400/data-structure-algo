
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
  abstract visit(key: K, value: V): boolean;
}

export interface Comparable {
  compareTo(key): number
}
