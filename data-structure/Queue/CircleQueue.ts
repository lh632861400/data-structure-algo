/**
 *
 * Based on ArrayList 循环队列
 * @module Queue
 *
 * */

export default class CircleQueue<E> {

  private size: number;

  /**
   *
   * @member front 当前队头的索引
   *
   * */
  private elements: Array<E>;

  /**
   *
   * @member front 当前队头的索引
   *
   * */
  private front: number;

  private static DEFAULT_CAPACITY = 10;

  constructor() {
    this.size = 0;
    this.front = 0;
    this.elements = new Array(CircleQueue.DEFAULT_CAPACITY)
  }

  clear(): void {
    for(let i = 0; i < this.elements.length; i++) {
      this.elements[i] = undefined;
    }
    this.size = 0;
    this.front = 0;
  }

  dequeue(): E {
    this.checkNotEmpty();

    const element = this.elements[this.index(this.size - 1)];
    this.size--;
    return element;
  }

  private checkNotEmpty() {
    if(this.size === 0) {
      throw new RangeError('the queue is empty')
    }
  }

  enqueue(element: E): void {
    this.ensureCapacity(this.size + 1);

    this.elements[this.index(this.size)] = element;
    this.size++;
  }

  private ensureCapacity(capacity: number): void {
    let oldCapacity = this.elements.length;

    // 如果capacity足够，不需要扩容
    if(oldCapacity >= capacity) {
      return;
    }

    // capacity 扩容为原来的1.5倍
    if(oldCapacity < capacity) {
      let newCapacity = oldCapacity + oldCapacity >> 2;
      const newElements = new Array(newCapacity);
      for(let i = 0; i < newCapacity; i++) {
        newElements[i] = this.elements[this.index(i)]
      }
      this.elements = newElements;
    }
  }

  /**
   *
   * 获取实际元素位置的索引
   *
   * */
  private index(offset: number) {
    let index = (this.front + offset);
    if(index < 0) {
      index = index + this.elements.length;
    }

    return index % this.elements.length;
  }

  peekFront(): E {
    return this.elements[this.front];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

}
