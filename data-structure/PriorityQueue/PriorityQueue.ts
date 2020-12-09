/**
 *
 * based on BinaryHeap
 *
 * @module PriorityQueue
 *
 * 优先级队列
 *
 * */
import {IQueue} from "./IQueue";
import BinaryHeap from "../Heap/BinaryHeap";
import {Comparator} from "../Heap/IHeap";

export default class PriorityQueue<E> implements IQueue<E> {

  private heap: BinaryHeap<E>;

  constructor(comparator: Comparator<E>);
  constructor(data: E[], comparator: Comparator<E>);
  constructor(data: E[] | Comparator<E>, comparator?: Comparator<E>) {

    if(data instanceof Array) {
      this.heap = new BinaryHeap(data, comparator)
    }else {
      comparator = data;
      this.heap = new BinaryHeap(comparator);

    }
  }

  clear(): void {
    this.heap.clear();
  }

  dequeue(): E {
    return this.heap.remove();
  }

  enqueue(element: E): void {
    this.heap.add(element)
  }

  front(): E {
    return this.heap.get();
  }

  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  size(): number {
    return this.heap.size();
  }

}

