/**
 *
 * Based on LinkedList 队列
 * @module Queue
 *
 * */

import SingleCircleLinkedList from "../LinkedList/single/SingleCircleLinkedList";
import {IQueue} from "./IQueue";

export default class Queue<E> implements IQueue<E> {

  list: SingleCircleLinkedList<E>;

  constructor() {
    this.list = new SingleCircleLinkedList<E>();
  }

  /**
   *
   * 是否为空
   *
   * */
  isEmpty(): boolean {
    return this.list.size === 0;
  }

  dequeue(): E {
    return this.list.remove();
  }

  enqueue(element: E): void {
    this.list.add(element)
  }

  front(): E {
    return this.list.getElement(0);
  }

  clear(): void {
    this.list.clear();
  }

}
