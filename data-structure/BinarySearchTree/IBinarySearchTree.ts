
export default interface IBinarySearchTree<E> {
  sizeMember: number;
  root: AbstractNode<E>;
  size(): number;
  clear(): void;
  add(element: E): void;
  remove(element: E): void;
  contains(element: E): boolean;
  height(): number;
  isComplete(): boolean;
  preorder(visitor: Visitor<E>): void;
  inorder(): void;
  postorder(): void;
  levelOrder(): void;
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
