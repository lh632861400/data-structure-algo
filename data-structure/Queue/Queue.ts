/**
 *
 * Based on LinkedList
 * @module Queue
 *
 * */

import SingleCircleLinkedList from "../LinkedList/single/SingleCircleLinkedList";
import {IQueue} from "./IQueue";

export default class Queue<E> implements IQueue<E> {

  size;
  list: SingleCircleLinkedList<E>;

  constructor() {
    this.size = 0;
    this.list = new SingleCircleLinkedList<E>();
  }

  isEmpty(): boolean {
    return this.size === 0;
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
    this.list.clear()
    this.size = 0;
  }

}
