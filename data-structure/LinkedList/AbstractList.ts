import {ILinkedList} from "./ILinkedList";
import SingleCircleLinkedList from "./single/SingleCircleLinkedList";

export default abstract class AbstractList<E> implements ILinkedList<E> {
  size;
  firstNode;
  protected  constructor() {

  }

  static ELEMENT_NOT_FOUND: number;
  abstract add(index: number | E, element?: E): void;
  abstract clear(): void;
  abstract contains(element: E): boolean;
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  rangeCheck(index: number) {
    if(index < 0 || index >= this.size) {
      throw RangeError('index must be > 0 < `size`')
    }
  }
  abstract getElement(index: number, element: E): E;
  abstract setElement(index: number, element: E): E;

  abstract remove(index?: number): E;
}

AbstractList.ELEMENT_NOT_FOUND = -1;
