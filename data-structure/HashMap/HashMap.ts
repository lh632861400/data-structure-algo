/**
 *
 * based on RBTree
 *
 * @module TreeMap
 *
 * */
import {AbstractVisitor, Comparable, IMap} from "./IMap";

export default class HashMap<K, V> implements IMap<K, V> {
  sizeMember: number;
  table: Node<K, V>[];

  constructor() {
    this.sizeMember = 0;
    this.table = new Array(HashMap.DEFAULT_CAPACITY);

  }

  static RED: boolean;
  static BLACK: boolean;
  static DEFAULT_CAPACITY: number;

  /**
   *
   * 清空
   *
   * */
  clear(): void {
    if(this.sizeMember === 0) {
      return;
    }

    this.sizeMember = 0;

    for(let i = 0; i < this.table.length; i++) {
      this.table[i] = undefined;
    }

  }

  containsKey(key: K): boolean {
    return !!this.node(key)
  }

  containsValue(value: V): boolean {
    return false;
  }

  get(key: K): V {
    const node = this.node(key);
    return node ? node.value : undefined;
  }

  isEmpty(): boolean {
    return this.sizeMember === 0;
  }

  put(key: K, value: V): V {

    const index = this.index(key);
    const root = this.table[index];

    const hash = this.hash(this.hashCode(key));

    if(!root) {

      const newNode = this.createNode(key, value,null, hash)
      this.table[index] = newNode;
      this.sizeMember++;

      this.afterPut(newNode, index)

      return undefined;
    }

    let parent = root;
    let node  = root
    let cmp = 0;

    let key1 = key;
    let h1 = hash;
    let searched = false;

    // 找到需要添加节点的位置
    while(node) {
      parent = node;


      let key2 = node.key;
      let h2 = node.hash;

      if(h1 < h2) { // 如果hash小于h2
        cmp = -1;
      }else if(h1 > h2) {
        cmp = 1;
      }else if(this.equals(key1, key2)) { // 如果hash相等，但是equals
        cmp = 0;
      }else if(this.comparable(key1, key2) && (cmp = key1.compareTo(2)) !== 0) { // 如果key1 key2具备可比较性

      }else { // 如果hash相等,但是不equals，key1 key2不具备可比较性，扫描

        if(!searched) {

          let queue = [];
          queue.push(node);

          while(queue.length) {

            let targetNode = queue.shift();

            if(this.equals(key1, targetNode.key)) { // 如果equals
              const oldValue = targetNode.value;
              targetNode.key = key;
              targetNode.value = value;
              return oldValue;
            }

            if(targetNode.left) {
              queue.push(targetNode.left)
            }

            if(targetNode.right) {
              queue.push(targetNode.right)
            }

          }

          searched = true;
          cmp = 1;

        }else { // 如果没有扫描到，则在右边
          cmp = 1;
        }

      }

      if(cmp < 0) {
        node = node.left;
      }else if(cmp > 0) {
        node = node.right;
      }else {
        const oldValue = node.value;
        node.key = key;
        node.value = value;
        return oldValue;
      }
    }

    // 找到需要添加节点的父节点
    const newNode = this.createNode(key, value, parent, hash);
    if(cmp < 0) { // 添加到left
      parent.left = newNode;
    }else { // 添加到right
      parent.right = newNode;
    }

    this.sizeMember++;

    this.afterPut(newNode, index);

    return undefined;
  }

  private node(key: K): Node<K, V> {

    if(this.sizeMember === 0) {
      return undefined;
    }

    const index = this.index(key);
    const key1 = key;
    const h1 = this.hash(this.hashCode(key1));
    let cmp = 0;

      const root = this.table[index];

      if(!root) {
        return undefined;
      }

      const queue = [];
      queue.push(root);

      while(queue.length) {

        let node = queue.shift();
        let key2 = node.key;
        let h2 = node.hash;

        if(h1 < h2) { // 如果hash小于h2
          cmp = -1;
        }else if(h1 > h2) {
          cmp = 1;
        }else if(this.equals(key1, key2)) { // 如果hash相等，但是equals
          cmp = 0;
        }else if(this.comparable(key1, key2) && (cmp = key1.compareTo(2)) !== 0) { // 如果key1 key2具备可比较性

        }else { // 如果hash相等,但是不equals，key1 key2不具备可比较性，扫描

          let queue = [];
          queue.push(node);

          while(queue.length) {

            let targetNode = queue.shift();

            if(this.equals(key1, targetNode.key)) { // 如果equals
              return node;
            }

            if(targetNode.left) {
              queue.push(targetNode.left)
            }

            if(targetNode.right) {
              queue.push(targetNode.right)
            }

          }

          return undefined;

        }

        if(cmp < 0) {
          node = node.left;
        }else if(cmp > 0) {
          node = node.right;
        }
      }

    return undefined;
  }

  private comparable(key1, key2): key1 is Comparable {

    return key1 !== undefined && key1 !== null && key2 !== undefined && key2 !== null && key1.__proto__.constructor === key2.__proto__.constructor && typeof key1.compareTo === 'function'

  }

  /**
   *
   * 创建节点
   *
   * */
  private createNode(key: K, value: V, parent: Node<K, V>, hash: number) {
    return new Node(key, value, parent, hash)
  }

  /**
   *
   * 添加节点之后触发
   * @param { Node<K, V> } node 添加的节点
   * @param { number } index 在table中的索引
   *
   * */
  private afterPut(node: Node<K, V>, index: number) {

    // 如果添加的节点是根节点，则black(node)
    if(!node.parent) {
      this.black(node);
      return;
    }

    // 如果添加的节点不是根节点，并且node.parent是black，则什么都不用操作
    if(this.isBlack(node.parent)) {
      return;
    }

    // 如果添加的节点不是根节点，uncle节点是黑色，则进行变色和旋转操作
    let grand = node.parent.parent;
    let parent = node.parent;
    if(this.isBlack(parent.sibling())) {

      if(parent.isLeftChild()) { // L

        // 相同的变色操作
        this.red(grand);

        if(node.isLeftChild()) { // LL

          this.black(parent);
          this.rotateRight(grand, index)
          return;

        }else { // LR
          this.black(node);
          this.red(grand);
          this.rotateLeft(parent, index);
          this.rotateRight(grand, index)
          return;
        }

      }else { // R

        this.red(grand);
        if(node.isLeftChild()) { // RL

          this.black(node);
          this.red(parent);
          this.rotateRight(parent, index);
          this.rotateLeft(grand, index);
          return;

        }else { // RR

          this.black(parent);
          this.rotateLeft(grand, index)
          return;

        }

      }
    }

    // 如果添加的节点不是根节点，并且grand的度为2，则在B树结构下产生丄溢，丄溢的节点作为新添加的节点操作

    const uncle = parent.sibling();
    this.black(parent);
    this.black(uncle);
    this.red(grand);
    this.afterPut(grand, index);

  }

  private rotateLeft(grand: Node<K, V>, index: number) {

    const parent = grand.right;

    grand.right = parent.left;
    parent.left = grand;

    if(grand.isLeftChild()) {
      grand.parent.left = parent;
    }else if(grand.isRightChild()) {
      grand.parent.right = parent;
    }else {
      this.table[index] = parent;
    }

    parent.parent = grand.parent;
    grand.parent = parent;
    if(grand.right) {
      grand.right.parent = grand;
    }

  }

  private rotateRight(grand: Node<K, V>, index: number) {

    const parent = grand.left;

    grand.left = parent.right;
    parent.right = grand;

    if(grand.isLeftChild()) {
      grand.parent.left = parent;
    }else if(grand.isRightChild()) {
      grand.parent.right = parent;
    }else {
      this.table[index] = parent;
    }

    parent.parent = grand.parent;
    grand.parent = parent;
    if(grand.left) {
      grand.left.parent = grand;
    }

  }

  remove(key: K): V {
    return undefined;
  }

  size(): number {
    return this.sizeMember;
  }

  traversal(visitor: AbstractVisitor<K, V>): void {
  }

  private index(key: K): number {
    let hashCode = this.hashCode(key);

    // 扰动算法，让所有二进制位参加运算
    hashCode = this.hash(hashCode)
    return hashCode & (this.table.length - 1);
  }

  private hashCode(key: K): number {

    if(key === null || key === undefined) {
      return 0;
    }

    // 如果是数字
    if(typeof key === 'number' || key instanceof Number){

      if((key as unknown as number) % 1 === 0) { // 如果是整数
        return key as unknown as number;
      }else { // 浮点数

        let _key = key as unknown as number;
        const arrayBuffer = new Float64Array(1)
        arrayBuffer.fill(_key)
        const dv = new DataView(arrayBuffer.buffer);
        return dv.getUint32(0) & dv.getUint32(1)

      }

    }else if(typeof key === 'string' || key instanceof  String) {
      return this.strHashCode(key as unknown as string)
    }else {
      // @ts-ignore
      if(typeof key.hashCode === 'function') {
        // @ts-ignore
        return key.hashCode();
      }else if(typeof key.valueOf() === 'number') {
        return this.hashCode(key);
      }else {
        return this.strHashCode(key.toString())
      }
    }

  }

  private hash(hashCode: number) {

    // 扰动算法，让所有二进制位参加运算
    hashCode = (hashCode >>> 32) & hashCode;

    return hashCode;

  }

  /**
   *
   * 字符窜的hashcode
   *
   * */
  private strHashCode(str: string): number {
    if(!str) {
      return 0;
    }

    let hashCode = 0;
    for(let i = 0; i < str.length; i++) {
      hashCode = (hashCode << 5) - hashCode + str.charCodeAt(i);
    }

    return hashCode;
  }

  private equals(key1, key2) {
    if(key1 === undefined || key1 === null) {
      return key1 === key2;
    }

    if(typeof key1.equals === 'function') {
      return key1.equals(key2);
    }

    return Object.is(key1, key2)

  }

  private color(node: Node<K, V>, color: boolean): Node<K, V> {
    node.color = color;
    return node as Node<K, V>;
  }

  private red(node: Node<K, V>) {
    this.color(node, HashMap.RED);
  }

  private black(node: Node<K, V>) {
    this.color(node, HashMap.BLACK)
  }

  private colorOf(node: Node<K, V>) {
    return node ? (<Node<K, V>> node).color : HashMap.BLACK;
  }

  private isRed(node: Node<K, V>) {
    return this.colorOf(node) === HashMap.RED;
  }

  private isBlack(node: Node<K, V>) {
    return this.colorOf(node) === HashMap.BLACK;
  }

}

HashMap.RED = false;

HashMap.BLACK = true;

HashMap.DEFAULT_CAPACITY = 1 << 4;

export class Node<K, V> {
  color: boolean;
  key: K;
  value: V;
  hash: number;
  parent: Node<K, V>;
  left: Node<K, V>;
  right: Node<K, V>;


  constructor(key: K, value: V, parent: Node<K, V>, hash: number) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.hash = hash;
  }

  hasTwoChildren() {
    return !!(this.left && this.right);
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  isLeftChild() {
    return !!(this.parent && this === this.parent.left)
  }

  isRightChild() {
    return !!(this.parent && this === this.parent.right)
  }

  sibling() {
    if(this.isLeftChild()) {
      return this.parent.right;
    }

    if(this.isRightChild()) {
      return this.parent.left;
    }

    return undefined;
  }

  toString() {
    return `${this.key.toString()}_p${this.parent.key.toString()}`
  }
}
