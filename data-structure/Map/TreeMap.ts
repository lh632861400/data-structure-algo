/**
 *
 * based on RBTree
 *
 * @module RBTree
 *
 * */
import {AbstractVisitor, Comparator, IMap} from "./IMap";

export default class TreeMap<K, V> implements IMap<K, V> {

  protected root: Node<K, V>;
  private sizeMember: number;
  private comparator: Comparator<K>;

  static RED: boolean;
  static BLACK: boolean;

  constructor(comparator?: Comparator<K>) {
    this.comparator = comparator;
    this.sizeMember = 0;
  }

  clear(): void {
    this.root = null;
    this.sizeMember = 0;
  }

  containsKey(key: K): boolean {
    const node = this.node(key);
    return !!node;
  }

  containsValue(value: V): boolean {
    if(!this.root) {
      return false
    }

    const queue = [];
    queue.push(this.root);

    while(queue.length) {

      const node = queue.shift();

     if(value === node.value) {
       return true;
     }

     if(node.left) {
       queue.push(node.left)
     }

      if(node.right) {
        queue.push(node.right)
      }

    }

    return false;
  }

  isEmpty(): boolean {
    return this.sizeMember === 0;
  }

  put(key: K, value: V): V {
    this.keyNotNullCheck(key);

    if(!this.root) {

      const newNode = this.createNode(key, value, null)
      this.root = newNode;
      this.sizeMember++;

      this.afterPut(newNode)

      return undefined;
    }

    let parent = null;
    let node  = this.root;
    let cmp = 0;

    // 找到需要添加节点的位置
    while(node) {
      parent = node;
      cmp = this.compare(key, node.key);

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
    const newNode = this.createNode(key, value, parent);
    if(cmp < 0) { // 添加到left
      parent.left = newNode;
    }else { // 添加到right
      parent.right = newNode;
    }

    this.sizeMember++;

    this.afterPut(newNode);

    return undefined;
  }

  private node(key: K): Node<K, V> {
    if(!this.root) {
      return undefined;
    }

    let node = this.root;

    // 遍历树形结构，查找相同的element
    while(node) {
      const cmp = this.compare(key, node.key);

      if(cmp < 0) { // 查找元素小于当前node.element
        node = node.left;
      }else if(cmp > 0) { // 查找元素大于当前node.element
        node = node.right;
      }else if(cmp === 0) { // 查找到改元素
        return node;
      }
    }

    // 没有找到该元素

    return undefined;

  }

  private keyNotNullCheck(key: K) {
    if(key === undefined || key === null) {
      throw new TypeError('key must not be null');
    }
  }

  /**
   *
   * 创建节点
   *
   * */
  private createNode(key: K, value: V, parent: Node<K, V>) {
    return new Node(key, value, parent)
  }

  /**
   *
   * 添加节点之后触发
   * @param { Node<K, V> } node 添加的节点
   *
   * */
  private afterPut(node: Node<K, V>) {

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
          this.rotateRight(grand)
          return;

        }else { // LR
          this.black(node);
          this.red(grand);
          this.rotateLeft(parent);
          this.rotateRight(grand)
          return;
        }

      }else { // R

        this.red(grand);
        if(node.isLeftChild()) { // RL

          this.black(node);
          this.red(parent);
          this.rotateRight(parent);
          this.rotateLeft(grand);
          return;

        }else { // RR

          this.black(parent);
          this.rotateLeft(grand)
          return;

        }

      }
    }

    // 如果添加的节点不是根节点，并且grand的度为2，则在B树结构下产生丄溢，丄溢的节点作为新添加的节点操作

    const uncle = parent.sibling();
    this.black(parent);
    this.black(uncle);
    this.red(grand);
    this.afterPut(grand);

  }

  private rotateLeft(grand: Node<K, V>) {

    const parent = grand.right;

    grand.right = parent.left;
    parent.left = grand;

    if(grand.isLeftChild()) {
      grand.parent.left = parent;
    }else if(grand.isRightChild()) {
      grand.parent.right = parent;
    }else {
      this.root = parent;
    }

    parent.parent = grand.parent;
    grand.parent = parent;
    if(grand.right) {
      grand.right.parent = grand;
    }

  }

  private rotateRight(grand: Node<K, V>) {

    const parent = grand.left;

    grand.left = parent.right;
    parent.right = grand;

    if(grand.isLeftChild()) {
      grand.parent.left = parent;
    }else if(grand.isRightChild()) {
      grand.parent.right = parent;
    }else {
      this.root = parent;
    }

    parent.parent = grand.parent;
    grand.parent = parent;
    if(grand.left) {
      grand.left.parent = grand;
    }

  }

  private color(node: Node<K, V>, color: boolean): Node<K, V> {
    node.color = color;
    return node as Node<K, V>;
  }

  private red(node: Node<K, V>) {
    this.color(node, TreeMap.RED);
  }

  private black(node: Node<K, V>) {
    this.color(node, TreeMap.BLACK)
  }

  private colorOf(node: Node<K, V>) {
    return node ? (<Node<K, V>> node).color : TreeMap.BLACK;
  }

  private isRed(node: Node<K, V>) {
    return this.colorOf(node) === TreeMap.RED;
  }

  private isBlack(node: Node<K, V>) {
    return this.colorOf(node) === TreeMap.BLACK;
  }

  /**
   *
   * 等于0， e1等于e2
   * 大于0， e1 大于e2
   * 小于0，e1小于e2
   *
   * */
  private compare(e1: K, e2: K): number {
    if(this.comparator) {
      return this.comparator.compare(e1, e2);
    }

    let cmp = 0;
    if(e1 > e2) cmp = 1;
    if(e1 < e2) cmp = -1;

    return cmp;
  }

  remove(key: K): V {
    return undefined;
  }

  size(): number {
    return this.sizeMember;
  }

  traversal(visitor: AbstractVisitor<K, V>): void {
    this.inorder(visitor);
  }

  /**
   *
   * 中序遍历
   *
   * */
  private inorder(visitor: AbstractVisitor<K, V>): void {
    if(!visitor) {
      return;
    }

    this.inorderNode(this.root, visitor);
  }

  private inorderNode(node: Node<K, V>, visitor: AbstractVisitor<K, V>): void {
    if(!node || visitor.stop) {
      return;
    }

    this.inorderNode(node.left, visitor);
    if(visitor.stop) {
      return;
    }
    visitor.visit(node.key, node.value);
    this.inorderNode(node.right, visitor);
  }

}

TreeMap.RED = false;

TreeMap.BLACK = true;

class Node<K, V> {
  color: boolean;
  key: K;
  value: V;
  parent: Node<K, V>;
  left: Node<K, V>;
  right: Node<K, V>;


  constructor(key: K, value: V, parent: Node<K, V>) {
    this.key = key;
    this.value = value;
    this.parent = parent;
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
    console.log(this.parent)
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
