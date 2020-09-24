
export interface ILinkedList<E> {
  size: number,
  firstNode: Node,
  clear: () => void,
  isEmpty: () => boolean,
  getSize: () => number,
  contains: (element: E) => boolean,
  add: IAdd<E>,
  remove: {
    (index: number): E,
    (): E,
  },
  getElement: (index: number, element: E) => E,
  setElement: (index: number, element: E) => E
}

interface IAdd<E> {
  (index: number, element: E): void,
  (element: E): void;
}
