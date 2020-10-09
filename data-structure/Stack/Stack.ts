/**
 *
 * Based on LinkedList
 * @module Stack
 *
 * */
import {IStack} from "./IStack";
import DuplxNoCircleLinkedList from "../LinkedList/duplx/DuplxNoCircleLinkedList";

export default class Stack<E> implements IStack<E> {
  list: DuplxNoCircleLinkedList<E>;

  constructor() {
    this.list = new DuplxNoCircleLinkedList()
  }

  size() {
    return this.list.size;
  }

  isEmpty() {
    return this.list.size === 0;
  }

  clear() {
    this.list.clear();
  }

  /**
   *
   * 返回栈顶元素
   *
   * */
  peek() {
    return  this.list.getElement(this.list.size - 1)
  }

  pop() {
    return this.list.remove();
  }

  push(e: E) {
    this.list.add(e);
  }

  toString() {
    let result = "";
    result += "[";
    for(let i = 0; i < this.list.size; i++) {
      result += this.list.getElement(i) + ", ";
    }
    result += "]";

    return result;
  }

}
