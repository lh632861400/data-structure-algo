/**
 *
 * based on RBTree
 *
 * @module RBTree
 *
 * */
import {AbstractVisitor, ISet} from "./ISet";
import RBTree from "../RBTree/RBTree";
import {Comparator} from "../RBTree/IBinarySearchTree";

export default class TreeSet<E> implements ISet<E> {

  tree: RBTree<E>;

  constructor(comparator?: Comparator<E>) {

    this.tree = new RBTree<E>(comparator)

  }

  add(element: E) {
    this.tree.add(element)
  }

  clear() {
    this.tree.clear();
  }

  contains(element: E) {
    return this.tree.contains(element)
  }

  isEmpty() {
    return this.tree.isEmpty();
  }

  remove(element: E) {
    this.tree.remove(element);
  }

  size() {
    return this.tree.size();
  }

  traversal(visitor: AbstractVisitor<E>) {
    this.tree.inorder(visitor)
  }

}
