
export interface  ITrie<E> {

  size(): number;

  isEmpty(): boolean;

  clear(): void;

  add(str: string, value: E): void;

  remove(str: string): E;

  startWith(prefix: string): boolean;

}
