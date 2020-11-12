import SingleCircleLinkedList from "../LinkedList/single/SingleCircleLinkedList";

/**
 *
 * Based on LinkedList 双端队列
 * @module Deque
 *
 * */

export default class Deque<E> {
  size: number;
  list: SingleCircleLinkedList<E>;

  constructor() {
    this.size = 0;
    this.list = new SingleCircleLinkedList<E>();
  }

  /**
   *
   * 是否为空
   *
   * */
  isEmpty(): boolean {
    return this.size === 0;
  }

  dequeueFront(): E {
    this.checkNotEmpty();

    return this.list.remove();
  }

  dequeueRear(): E {
    this.checkNotEmpty();

    return this.list.remove(this.size - 1);
  }

  enqueueFront(element: E): void {
    this.list.add(0, element)
  }

  enqueueRear(element: E): void {
    this.list.add(element)
  }

  front(): E {
    return this.list.getElement(0);
  }

  rear(): E {
    return this.list.getElement(this.size - 1);
  }

  checkNotEmpty() {
    if(this.size === 0) {
      throw new RangeError('the queue is empty')
    }
  }

  clear(): void {
    this.list.clear();
    this.size = 0;
  }
}
