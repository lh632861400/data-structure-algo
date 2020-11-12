/**
 *
 * Based on ArrayList 双端循环队列
 * @module Queue
 *
 * */

export default class CircleDeque<E> {

  size: number;
  front: number;
  elements: Array<E>;

  public static DEFAULT_CAPACITY: number;

  constructor() {
    this.size = 0;
    this.front = 0;
    this.elements = new Array<E>(CircleDeque.DEFAULT_CAPACITY)
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
    const element = this.elements[this.front];
    this.front = (this.front + 1) % this.elements.length;
    this.size--;
    return element;
  }

  dequeueRear(): E {
    this.checkNotEmpty();
    const element = this.elements[this.index(this.size - 1)];
    this.size--;
    return element;
  }

  enqueueFront(element: E): void {
    this.ensureCapacity(this.size + 1);
    const front = this.index(-1);
    this.elements[front] = element;
    this.front = front;
    this.size++
  }

  enqueueRear(element: E): void {
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
    return this.elements[this.front]
  }

  peekRear(): E {
    return this.elements[this.index(this.size - 1)]
  }

  checkNotEmpty() {
    if(this.size === 0) {
      throw new RangeError('the queue is empty')
    }
  }

  clear(): void {
    this.size = 0;
    this.front = 0;
    for(let i = 0; i < this.elements.length; i++) {
      this.elements[i] = undefined;
    }
  }

  toString() {
    let result = '';
    result = `size=${this.size}, front=${this.front}, [`
    for(let i = 0; i < this.size; i++) {
      result += this.elements[this.index(i)] + ", "
    }

    result += "]"

    return result;
  }

}

CircleDeque.DEFAULT_CAPACITY = 10;
