
export interface IQueue<E> {
  size: number,
  isEmpty(): boolean,
  enqueue(element: E): void,
  dequeue(): E,
  front(): E,
  clear(): void,
}
