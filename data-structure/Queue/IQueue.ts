
export interface IQueue<E> {
  isEmpty(): boolean,
  enqueue(element: E): void,
  dequeue(): E,
  front(): E,
  clear(): void,
}
