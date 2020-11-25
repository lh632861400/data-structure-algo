/**
 *
 * based on TreeMap
 *
 * @module TreeSet
 *
 * */
import {AbstractVisitor, ISet} from "../Set/ISet";
import TreeMap from "./TreeMap";

export default class TreeSet<E> implements ISet<E> {
  map: TreeMap<E, Object>;

  add(element: E): void {
    this.map.put(element, null)
  }

  clear(): void {
    this.map.clear();
  }

  contains(element: E): boolean {
    return this.map.containsKey(element)
  }

  isEmpty(): boolean {
    return this.map.isEmpty();
  }
  remove(element: E): void {
    this.map.remove(element)
  }

  size(): number {
    return this.map.size();
  };

  traversal(visitor: AbstractVisitor<E>) {
    this.map.traversal(visitor)
  }

}
