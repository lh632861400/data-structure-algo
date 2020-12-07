/**
 *
 * based on RBTree
 *
 * @module RBTree
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
    if(this.sizeMember === 0) {
      return false;
    }

    for(let i = 0; i < this.table.length; i++) {

      const root: Node<K, V> = this.table[i];

      if(!root) {
        continue;
      }

      const queue: Node<K, V>[] = [];
      queue.push(root);

      while(queue.length) {

        const node = queue.shift();

        if(node.value === value) {
          return true;
        }

        if(node.left) {
          queue.push(node.left)
        }

        if(node.right) {
          queue.push(node.right)
        }

      }

    }

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

    const index = this.index(key);
    const root = this.table[index];

    if(!root) {
      return undefined;
    }

    let oldValue = undefined;

    let targetNode = this.node(key);

    // 不存在这个node
    if(!targetNode) {
      return undefined;
    }

    oldValue = targetNode.value;

    // 删除的节点的度为2，查找targetNode的前驱或者后继，将前驱或者后继的element赋值给targetNode.element
    if(targetNode.hasTwoChildren()) {
      const predecessorNode = this.predecessorNode(targetNode);

      targetNode.key = predecessorNode.key;
      targetNode.value = predecessorNode.value;
      targetNode.hash = predecessorNode.hash;

      // 删除前驱节点
      targetNode = predecessorNode;
    }

    // 删除节点的度为1或者度为0的节点
    if(!targetNode.isLeaf()) { // 删除的节点的度为1

      const childNode = targetNode.left || targetNode.right;

      childNode.parent = targetNode.parent;

      if(targetNode === root) { // 如果删除的是根节点
        this.table[index] = childNode;
      }else {
        if(targetNode === targetNode.parent.left) {
          targetNode.parent.left = childNode;
        }else {
          targetNode.parent.right = childNode;
        }
      }

      this.afterRemove(childNode)

    }else { // 删除的节点的度为0
      if(targetNode === root) { // 删除的是根节点
        this.table[index] = undefined;

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
        this.rotateRight(node.parent, this.index(node.key));

        // 旋转之后sibling为parent的left;
        sibing = node.parent.right;

      }

      // 如果兄弟节点为黑色

      if(this.isBlack(sibing.left) && this.isBlack(sibing.right)) { // 如果兄弟节点没有红色子节点

        if(this.isRed(node.parent)) { // 如果node.parent为红色, red(sibling),black(node.parent)
          this.black(node.parent);
          this.red(sibing);
          this.rotateLeft(node.parent, this.index(node.key))
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
          this.rotateRight(sibing, this.index(node.key));
          this.rotateLeft(node.parent, this.index(node.parent.key))
        }

      }

    }else { // 删除的右节点

      // 如果兄弟节点为红色
      if(this.isRed(sibing)) {

        // 旋转parent节点,red(parent),black(sibling)
        this.black(sibing);
        this.red(node.parent);
        this.rotateRight(node.parent, this.index(node.parent.key));

        // 旋转之后sibling为parent的left;
        sibing = node.parent.left;

      }

      // 如果兄弟节点为黑色

      if(this.isBlack(sibing.left) && this.isBlack(sibing.right)) { // 如果兄弟节点没有红色子节点

        if(this.isRed(node.parent)) { // 如果node.parent为红色, red(sibling),black(node.parent)
          this.black(node.parent);
          this.red(sibing);
          this.rotateRight(node.parent, this.index(node.parent.key))
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
          this.rotateLeft(sibing, this.index(sibing.key));
          this.rotateRight(node.parent, this.index(node.parent.key))
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
    if(this.sizeMember === 0 || !visitor) {
      return;
    }

    for(let i = 0; i < this.table.length; i++) {
      const root = this.table[i];

      if(!root) {
        continue;
      }

      const queue: Node<K, V>[] = [];
      queue.push(root);

      while(queue.length) {

        const node = queue.shift();

        if(visitor.visit(node.key, node.value)) {
          return;
        }

        if(node.left) {
          queue.push(node.left)
        }

        if(node.right) {
          queue.push(node.right)
        }

      }
    }
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
