
export default interface IBinarySearchTree<E> {
  sizeMember: number;
  root: AbstractNode<E>;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  add(element: E): void;
  remove(element: E): void;
  contains(element: E): boolean;
  height(): number;
  isComplete(): boolean;
  preorder(visitor: Visitor<E>): void;
  inorder(visitor: Visitor<E>): void;
  postorder(visitor: Visitor<E>): void;
  levelOrder(visitor: Visitor<E>): void;
  predecessor(node: AbstractNode<E>): AbstractNode<E>;
  successor(node: AbstractNode<E>): AbstractNode<E>;
}

export abstract class AbstractNode<E> {
  element: E;
  parent: AbstractNode<E>;
  left: AbstractNode<E>;
  right: AbstractNode<E>;
}

export interface Visitor<E> {

  stop: boolean;

  visit(element: E): void;

}

export interface Comparator<E> {
  compare(e1: E, e2: E): number;
}
