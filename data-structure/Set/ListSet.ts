/**
 *
 * based on LinkedList
 *
 * @module RBTree
 *
 * */
import {AbstractVisitor, ISet} from "./ISet";
import SingleCircleLinkedList from "../LinkedList/single/SingleCircleLinkedList";

export default class ListSet<E> implements ISet<E> {

  list: SingleCircleLinkedList<E>;

  constructor() {

    this.list = new SingleCircleLinkedList<E>()

  }

  add(element: E) {
    const index = this.list.index(element);

    // 如果元素已存在
    if(index !== SingleCircleLinkedList.ELEMENT_NOT_FOUND) {
      this.list.setElement(index, element);
    }else {
      this.list.add(element);
    }

  }
  clear() {
    this.list.clear();
  }
  contains(element: E) {
    return this.list.contains(element)
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  remove(element: E) {
    const index = this.list.index(element);
    if(index !== SingleCircleLinkedList.ELEMENT_NOT_FOUND) {
      this.list.remove()
    }
  }

  size() {
    return this.list.size;
  }

  traversal(visitor: AbstractVisitor<E>) {
    if(!visitor) {
      return;
    }

    for(let i = 0; i < this.size(); i++) {
      visitor.visit(this.list.getElement(i));

      if(visitor.stop) {
        return;
      }
    }
  }

}
