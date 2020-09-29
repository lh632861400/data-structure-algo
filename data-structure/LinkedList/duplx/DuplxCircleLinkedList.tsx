import AbstractList from "../AbstractList";

export default class DuplxCircleLinkedList<E> extends AbstractList<E> {
  size;
  firstNode;
  lastNode: LinkedListNode<E>;
  current: LinkedListNode<E>;

  constructor() {
    super();

    this.size = 0;
    this.firstNode = null;
    this.lastNode = null;
  }

  add(index, element?: E): void {
    if(element === undefined) { // 只有一个参数
      element = index;
      index = this.size;
    }

    this._add(index, element);
  }

  _add(index, element): void {

    this.rangeCheckForAdd(index);

    if(index === 0) { // 在第一个位置插入node
      let next = this.size === 0 ? undefined : this.firstNode;
      const newNode = new LinkedListNode<E>(undefined, element, next);
      newNode.next = next;
      this.firstNode = newNode;

      if(this.size === 0) {
        this.lastNode = newNode
      }

      newNode.next = this.firstNode;

    }else {
      // 之前的index - 1位置的node
      let prev = this.node(index - 1);
      let next = prev.next;
      const newNode = new LinkedListNode<E>(prev, element, next);
      prev.next = newNode;
      newNode.next = next;
      if(prev === this.lastNode) { // 如果添加到size索引的位置
        this.lastNode = newNode;
        newNode.next = this.firstNode;
      }else {
        next.prev = newNode;
      }
    }

    this.size++;

  }

  next(): E {
    if(!this.current) {
      this.current = this.firstNode;
    }

    if(!this.current) {
      return undefined;
    }

    const oldElement = this.current.element;
    this.current = this.current.next;

    return oldElement;
  }

  reset(): void {
    this.current = this.firstNode;
  }

  node(index): LinkedListNode<E> {
    this.rangeCheck(index);

    let node = this.firstNode;
    for(let i = 0; i < this.size; i++) {
      if(i === index) { // 找到了指定index的节点
        return node;
      }

      node = node.next;
    }

    return undefined;
  }

  remove(index?: number): E {

    index = index === undefined ? this.size - 1 : index;

    this.rangeCheck(index);

    let node = this.firstNode;
    if(index === 0) {
      if(this.size === 1) {
        this.firstNode = undefined;
        this.lastNode = undefined;
      }else {
        const next = this.firstNode.next;
        next.prev = undefined;
        this.firstNode = next;
      }
    }else {
      const node = this.node(index );
      const prev = node.prev;
      const next = node.next;
      prev.next = next;

      if(this.lastNode === node) { // 删除最后一个节点
        this.lastNode = prev;
        prev.next = node.next;
      }else {
        next.prev = prev;
      }

    }

    if(node === this.current) {
      this.current = undefined;
    }

    this.size--;

    return node.element;
  }

  clear(): void {
    this.firstNode = undefined;
    this.lastNode = undefined;
    this.current = undefined;
    this.size = 0;
  }

  contains(element: E): boolean {
    if(!this.firstNode) {
      return false;
    }

    let node = this.firstNode;
    // while(node) {
    //   if(node.element === element) {
    //     return true;
    //   }
    //
    //   node = node.next;
    // }

    for(let i = 0; i < this.size; i++) {
      if(this.node(i).element === element) {
        return true;
      }
    }

    return false;
  }

  getElement(index: number): E {
    const node = this.node(index);
    return node ? node.element : undefined;
  }

  setElement(index: number, element: E): E {
    this.rangeCheck(index);

    const node = this.node(index);
    const oldElement = node.element;
    node.element = element;
    return oldElement;
  }

  private rangeCheckForAdd(index: number) {
    if(index < 0 || index > this.size) {
      throw RangeError('index must be > 0 <= `size`')
    }
  }

  toString() {
    let result = '';
    let node = this.firstNode
    for(let i = 0; i < this.size; i++) {
      result = result + node + "_";
      node = node.next
    }

    return result;
  }

}

class LinkedListNode<E> {
  prev: LinkedListNode<E>;
  element: E;
  next: LinkedListNode<E>;

  constructor(prev: LinkedListNode<E>, element: E, next: LinkedListNode<E>) {
    this.prev = prev;
    this.element = element;
    this.next = next;
  }

  toString() {
    return this.element + "";
  }
}
