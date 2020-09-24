import AbstractList from "../AbstractList";

export default class SingleNoCircleLinkedList<E> extends AbstractList<E> {
  size;
  firstNode;

  constructor() {
    super();

    this.size = 0;
    this.firstNode = null;
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
      const newNode = new LinkedListNode<E>(element, next);
      this.firstNode = newNode;
    }else {
      // 之前的index - 1位置的node
      let prev = this.node(index - 1);
      let next = prev.next;
      const newNode = new LinkedListNode<E>(element, next);
      prev.next = newNode;
    }

    this.size++;

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
      const next = this.firstNode.next;
      this.firstNode = next;
    }else {
      const prev = this.node(index - 1);
      node = prev.next;
      const next = prev.next.next;
      prev.next = next;
    }

    this.size--;

    return node.element;
  }

  clear(): void {
    this.firstNode = undefined;
    this.size = 0;
  }

  contains(element: E): boolean {
    if(!this.firstNode) {
      return false;
    }

    let node = this.firstNode;
    while(node) {
      if(node.element === element) {
        return true;
      }

      node = node.next;
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
  element: E;
  next: LinkedListNode<E>;

  constructor(element: E, next: LinkedListNode<E>) {
    this.element = element;
    this.next = next;
  }

  toString() {
    return this.element + "";
  }
}
