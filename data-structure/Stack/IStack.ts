
export interface IStack<E> {
  size: () => number,
  isEmpty: () => boolean,
  clear: () => void,
  push: (e: E) => void,
  pop: () => E,
  peek: () => E,
}
