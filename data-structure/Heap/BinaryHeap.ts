/**
 *
 * based on ArrayList
 *
 * @module BinaryHeap
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
import {Comparable, Comparator, IHeap} from "./IHeap";

export default class BinaryHeap<E> implements IHeap<E> {

  private sizeMember: number;
  private elements: E[];
  private comparator: Comparator<E>;
  static DEFAULT_CAPACITY: number;

  constructor(comparator: Comparator<E>);
  constructor(data: E[], comparator: Comparator<E>)
  constructor(data: E[] | Comparator<E>, comparator?: Comparator<E>) {

    if(data instanceof  Array) {
      const capacity = Math.max(BinaryHeap.DEFAULT_CAPACITY, data.length)
      this.elements = new Array(capacity);
      this.comparator = comparator;

      for(let i = 0; i < data.length; i++) {
        this.elements[i] = data[i];
      }

      // heapify
      this.heapify(this.elements);

    }else {
      this.comparator = data;
      this.elements = new Array(BinaryHeap.DEFAULT_CAPACITY)
    }

    this.sizeMember = 0;

  }

  add(element: E): void {

    // 检查元素是否为空
    this.checkNotEmpty(element);

    // ensurecapacity
    this.ensureCapacity(this.sizeMember + 1);

    this.elements[this.sizeMember] = element;

    this.siftUp(this.sizeMember);

    this.sizeMember++;

  }

  private ensureCapacity(capacity: number) {

    if(capacity > this.elements.length) {
      const newElements = new Array<E>(this.elements.length >> 1);
      for(let i = 0; i < this.elements.length; i++) {
        newElements[i] = this.elements[i];
      }

      this.elements = newElements;
    }

  }

  private siftUp(index: number) {
    const element = this.elements[index];

    // 小于等于父节点或者已经是根节点不需要上滤
    while (index > 0) {

      const parentIndex = (index - 1) >> 1;
      const parentElement = this.elements[parentIndex];
      if(this.compare(element, parentElement) > 0) {
        this.elements[index] = parentElement;
        index = parentIndex;
      }

      break;

    }

    this.elements[index] = element;

  }

  private checkNotEmpty(element: E) {
    if(element === undefined || element === null) {
      throw new Error('element must not be null')
    }
  }

  private compare(e1: E, e2: E) {
    return this.comparator ? this.comparator.compare(e1, e2) : (e1 as unknown as Comparable<E>).compareTo(e2)
  }

  clear(): void {
    if(this.sizeMember === 0) {
      return;
    }

    this.sizeMember = 0;
    for(let i = 0; i < this.elements.length; i++) {
      this.elements[i] = undefined;
    }
  }

  get(): E {
    this.notEmptyCheck();

    return this.elements[0];
  }

  isEmpty(): boolean {
    return this.sizeMember === 0;
  }

  remove(): E {
    this.notEmptyCheck();

    const root = this.elements[0];

    this.elements[0] = this.elements[this.sizeMember - 1];
    this.elements[this.sizeMember - 1] = undefined;
    this.sizeMember--;

    if(this.sizeMember > 0) {
      this.siftDown(0)
    }

    return root;
  }

  private siftDown(index: number) {

    const element = this.elements[index];

    // 得到非叶子节点的索引
    const half = this.sizeMember >> 1;

    // 如果index小于子节点

    while(index < half) {

      // 默认左节点为比较大的节点
      let childIndex = index >> 1 + 1;
      let child = this.elements[childIndex];

      // 比较右节点和左节点
      const rightIndex = childIndex + 1;
      if(rightIndex < this.sizeMember && this.elements[rightIndex] > child) {
        childIndex = rightIndex;
        child = this.elements[rightIndex];
      }

      // 如果父节点小于叶子节点
      if(this.compare(element, child) < 0) {
        this.elements[index] = child;
        index = childIndex;
      }

    }

    this.elements[index] = element;

  }

  private notEmptyCheck() {
    if(this.sizeMember === 0) {
      throw new Error('size is empty')
    }
  }

  replace(element: E): E {

    const root = this.elements[0];

    this.elements[0] = element;
    this.siftDown(0);

    return root;
  }

  size(): number {
    return this.sizeMember;
  }

  private heapify(elements: E[]) {

    // 采用自下而上的下滤
    const half = elements.length >> 1;
    for(let i = half - 1; i >= 0; i--) {
      this.siftDown(i)
    }

  }

}

BinaryHeap.DEFAULT_CAPACITY = 10;
