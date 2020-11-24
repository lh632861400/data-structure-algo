
export interface ISet<E> {
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  contains: (element: E) => boolean;
  add: (element: E) => void;
  remove: (element: E) => void;
  traversal: (visitor: AbstractVisitor<E>) => void;
}

export abstract class AbstractVisitor<E> {
  stop: boolean;
  visit: (element: E) => void;
}
