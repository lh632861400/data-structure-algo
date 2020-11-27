/**
 *
 * based on RBTree
 *
 * @module TreeMap
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

    let targetNode = this.node(key);

    if(!targetNode) {
      return undefined;
    }

    const oldValue = targetNode.value;

    // 删除的节点的度为2，查找targetNode的前驱或者后继，将前驱或者后继的element赋值给targetNode.element
    if(targetNode.hasTwoChildren()) {
      const predecessorNode = this.predecessorNode(targetNode);

      targetNode.key = predecessorNode.key;
      targetNode.value = predecessorNode.value;

      // 删除前驱节点
      targetNode = predecessorNode;
    }

    // 删除节点的度为1或者度为0的节点
    if(!targetNode.isLeaf()) { // 删除的节点的度为1

      const childNode = targetNode.left || targetNode.right;

      childNode.parent = targetNode.parent;

      if(targetNode === this.root) { // 如果删除的是根节点
        this.root = childNode;
      }else {
        if(targetNode === targetNode.parent.left) {
          targetNode.parent.left = childNode;
        }else {
          targetNode.parent.right = childNode;
        }
      }

      this.afterRemove(childNode)

    }else { // 删除的节点的度为0
      if(targetNode === this.root) { // 删除的是根节点
        this.root = undefined;

        this.afterRemove(targetNode)
      }else {
        if(targetNode === targetNode.parent.left) {
          targetNode.parent.left = undefined;

          this.afterRemove(targetNode)
        }else {
          targetNode.parent.right = undefined;

          this.afterRemove(targetNode)
        }
      }
    }

    this.sizeMember--;

    return oldValue;
  }

  /**
   *
   * node是删除的节点或者replacement节点
   *
   * */
  protected afterRemove(node: Node<K, V>) {

    // 删除的是黑色节点
    // 节点的度为2删除的是节点的前驱或者后继来到这里的都是度为1叶子节点
    if(this.isRed(node)) { // 替代的节点是红色节点
      this.black(node);
      return;
    }

    // 删除的是根节点
    if(!node.parent) {
      return;
    }

    // 删除的是黑色叶子节点
    // parent.left来判断删除的节点的位置，不存在parent.left为null, parent.right存在这样的节点，这是由于红黑树性质决定的，任意一个节点到外部节点的路径包含的黑色节点个数一样，假如parent.left为null,parent.right为黑色叶子节点，这样不满足红黑树性质，只有当parent.left存在，parent.right存在这样才会满足红黑树性质，所以可以利用parent.left === null 判断原来删除节点的位置

    // node.isLeftChild是node.parent为黑色下溢
    const left = !node.parent.left || node.isLeftChild();
    let sibing = left ? node.parent.right : node.parent.left;

    if(left) { // 删除的是左节点

      // 如果兄弟节点为红色
      if(this.isRed(sibing)) {

        // 旋转parent节点,red(parent),black(sibling)
        this.black(sibing);
        this.red(node.parent);
        this.rotateRight(node.parent);

        // 旋转之后sibling为parent的left;
        sibing = node.parent.right;

      }

      // 如果兄弟节点为黑色

      if(this.isBlack(sibing.left) && this.isBlack(sibing.right)) { // 如果兄弟节点没有红色子节点

        if(this.isRed(node.parent)) { // 如果node.parent为红色, red(sibling),black(node.parent)
          this.black(node.parent);
          this.red(sibing);
          this.rotateLeft(node.parent)
        }else { // 如果node.parent为红色, red(sibling),black(node.parent)，afterMove(node.parent)
          this.red(sibing);
          this.afterRemove(node.parent)
        }

      }else {

        // 兄弟节点至少有一个红色子节点
        if(sibing.right) { // RR

          this.color(sibing, this.colorOf(node.parent));
          this.black(node.parent);
          this.black(sibing.right);

        }else { // RL
          this.color(sibing.left, this.colorOf(node.parent));
          this.black(node.parent);
          this.rotateRight(sibing);
          this.rotateLeft(node.parent)
        }

      }

    }else { // 删除的右节点

      // 如果兄弟节点为红色
      if(this.isRed(sibing)) {

        // 旋转parent节点,red(parent),black(sibling)
        this.black(sibing);
        this.red(node.parent);
        this.rotateRight(node.parent);

        // 旋转之后sibling为parent的left;
        sibing = node.parent.left;

      }

      // 如果兄弟节点为黑色

      if(this.isBlack(sibing.left) && this.isBlack(sibing.right)) { // 如果兄弟节点没有红色子节点

        if(this.isRed(node.parent)) { // 如果node.parent为红色, red(sibling),black(node.parent)
          this.black(node.parent);
          this.red(sibing);
          this.rotateRight(node.parent)
        }else { // 如果node.parent为红色, red(sibling),black(node.parent)，afterMove(node.parent)
          this.red(sibing);
          this.afterRemove(node.parent)
        }

      }else {

        // 兄弟节点至少有一个红色子节点
        if(sibing.left) { // LL

          this.color(sibing, this.colorOf(node.parent));
          this.black(node.parent);
          this.black(sibing.left);

        }else { // LR
          this.color(sibing.right, this.colorOf(node.parent));
          this.black(node.parent);
          this.rotateLeft(sibing);
          this.rotateRight(node.parent)
        }

      }

    }

  }

  private predecessorNode(node: Node<K, V>): Node<K, V> {

    // node.left != null，node.left.right.right.right...
    if(node.left) {
      node = node.left;
      while(node.right) {
        node = node.right;
      }

      return node;
    }

    // 寻找node.parent.parent.parent 到 node 的祖先节点某一个右子树上
    while (node.parent) {
      if(node === node.parent.right) {
        return node.parent;
      }

      node = node.parent;
    }

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

  get(key: K): V {
    if(this.sizeMember === 0) {
      return undefined;
    }

    let node = this.root;

    while(node) {

      const cmp =this.compare(key, node.key);

      if(cmp === 0) {
        return node.value
      }else if(cmp > 0) {
        node = node.right
      }else {
        node = node.left;
      }

    }

    return undefined;
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
