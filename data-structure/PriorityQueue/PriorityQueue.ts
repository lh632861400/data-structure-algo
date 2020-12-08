/**
 *
 * based on BinaryHeap
 *
 * @module PriorityQueue
 *
 * 二叉堆是一颗完全二叉树
 *
 * i为索引 i >= 0
 * n为元素个数
 *
 * 左子节点的索引 2 * i + 1
 * 右子节点的索引 2 * i + 2
 *
 * 非叶子节点个数floor(n / 2)
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

