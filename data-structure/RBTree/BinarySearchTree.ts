/**
 *
 *
 * @module Stack
 *
 * */
import IBinarySearchTree, {AbstractNode, Comparator, Visitor} from "./IBinarySearchTree";
import Queue from "../Queue/Queue";

export default class BinarySearchTree<E> {
  protected root: Node<E>;
  private sizeMember: number;
  private comparator: Comparator<E>;

  constructor(comparator?: Comparator<E>) {
    this.sizeMember = 0;
    this.comparator = comparator;
  }

  add(element: E): void {
    if(!this.root) {

      const newNode = this.createNode(element, null)
      this.root = newNode;
      this.sizeMember++;

      this.afterAdd(newNode)

      return;
    }

    let parent = null;
    let node  = this.root;
    let cmp = 0;

    // 找到需要添加节点的位置
    while(node) {
      parent = node;
      cmp = this.compare(element, node.element);

      if(cmp < 0) {
        node = node.left;
      }else if(cmp > 0) {
        node = node.right;
      }else {
        node.element = element;
        return;
      }
    }

    // 找到需要添加节点的父节点
    const newNode = this.createNode(element, parent);
    if(cmp < 0) { // 添加到left
      parent.left = newNode;
    }else { // 添加到right
      parent.right = newNode;
    }

    this.sizeMember++;

    this.afterAdd(newNode)
  }

  /**
   *
   * 创建节点
   *
   * */
  protected createNode(element: E, parent: Node<E>) {
    return new Node(element, parent)
  }

  /**
   *
   * 添加节点之后触发
   * @param { Node<E> } node 添加的节点
   *
   * */
  protected afterAdd(node: Node<E>) {

  }

  /**
   *
   * 等于0， e1等于e2
   * 大于0， e1 大于e2
   * 小于0，e1小于e2
   *
   * */
  private compare(e1: E, e2: E): number {
    if(this.comparator) {
      return this.comparator.compare(e1, e2);
    }

    let cmp = 0;
    if(e1 > e2) cmp = 1;
    if(e1 < e2) cmp = -1;

    return cmp;
  }

  /**
   *
   * 清空树形结构的
   *
   * */
  clear(): void {
    this.sizeMember = 0;
    this.root = undefined;
  }

  /**
   *
   * 是否包含元素
   *
   * */
  contains(element: E): boolean {
    return !!this.node(element);
  }

  /**
   *
   * 前序遍历
   *
   * */
  preorder(visitor: Visitor<E>): void {
    if(!visitor) {
      return;
    }

    this.preorderNode(this.root, visitor);
  }

  preorder2(visitor: Visitor<E>): void {

    let node = this.root;

    if(!node) {
      return;
    }

    const stack: Node<E>[] = [];

    stack.push(node)

    while(stack.length) {

      if(visitor.stop) {
        break;
      }

      node = stack.pop();

      visitor.visit(node.element);

      if(node.right) {
        stack.push(node.right)
      }

      if(node.left) {
        stack.push(node.left)
      }

    }

  }

  private preorderNode(node: Node<E>, visitor: Visitor<E>) {
    if(!node || visitor.stop) {
      return;
    }

    if(visitor.stop) {
      return;
    }
    visitor.visit(node.element)
    this.preorderNode(node.left, visitor);
    this.preorderNode(node.right, visitor);

  }

  /**
   *
   * 中序遍历
   *
   * */
  inorder(visitor: Visitor<E>): void {
    if(!visitor) {
      return;
    }

    this.inorderNode(this.root, visitor);
  }

  inorder2(visitor: Visitor<E>): void {

    let node = this.root;

    if(!node) {
      return;
    }

    const stack: Node<E>[] = [];

    do {

      if(visitor.stop) {
        break;
      }

      // 左节点全部入栈
      while(node) {
        stack.push(node);
        node = node.left;
      }

      // 去除一个左节点
      if(stack.length) {
        node = stack.pop();

        visitor.visit(node.element)

        node = node.right;
      }

    }while(stack.length || node)

  }

  private inorderNode(node: Node<E>, visitor: Visitor<E>): void {
    if(!node || visitor.stop) {
      return;
    }

    this.inorderNode(node.left, visitor);
    if(visitor.stop) {
      return;
    }
    visitor.visit(node.element);
    this.inorderNode(node.right, visitor);
  }

  /**
   *
   * 后序遍历
   *
   * */
  postorder(visitor: Visitor<E>): void {

    if(!visitor) {
      return;
    }

    this.postorderNode(this.root, visitor);

  }

  postorder2(visitor: Visitor<E>): void {

    if(!this.root) {
      return;
    }

    const stack: Node<E>[] = [];

    const results: E[] = [];

    let node = null;

    stack.push(this.root);

    while(stack.length) {

      node = stack.pop();

      if(node.left) {
        stack.push(node.left);
      }

      if(node.right) {
        stack.push(node.right);
      }

      results.unshift(node.element)

    }

    results.some((element) => {
      visitor.visit(element);

      return visitor.stop;
    })

  }

  private postorderNode(node: Node<E>, visitor: Visitor<E>): void {
    if(!node || visitor.stop) {
      return;
    }

    this.postorderNode(node.left, visitor);
    this.postorderNode(node.right, visitor);
    if(visitor.stop) {
      return;
    }
    visitor.visit(node.element)
  }

  /**
   *
   * 层序遍历
   *
   * */
  levelOrder(visitor: Visitor<E>): void {

    if(!visitor) {
      return;
    }

    const queue = []

    queue.push(this.root);

    // 遍历当前节点的左节点和右节点，加入到队列
    while(!queue.length && !visitor.stop) {

      const node = queue.shift();

      visitor.visit(node.element);

      if(node.left) {
        queue.push(node.left);
      }

      if(node.right) {
        queue.push(node.right);
      }
    }

  }

  /**
   *
   * 前驱节点
   *
   * */
  predecessor(element: E): E{
    const targetNode = this.node(element);

    if(!targetNode) { // 不存在element这个元素
      return undefined;
    }

    const predecessor = this.predecessorNode(targetNode);

    if(predecessor) { // 如果存在前去节点
      return predecessor.element
    }

    return undefined;
  }

  private predecessorNode(node: Node<E>): Node<E> {

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

  successor(element: E): E {
    const targetNode = this.node(element);

    if(!targetNode) { // 不存在element这个元素
      return undefined;
    }

    const predecessor = this.succesorNode(targetNode);

    if(predecessor) { // 如果存在前去节点
      return predecessor.element
    }

    return undefined;
  }

  private succesorNode(node: Node<E>): Node<E> {

    // node.right != null，node.right.left.left.left...
    if(node.right) {
      node = node.right;
      while(node.left) {
        node = node.left;
      }

      return node;
    }

    // 寻找node.parent.parent.parent 到 node 的祖先节点某一个左子树上
    while (node.parent) {
      if(node === node.parent.left) {
        return node.parent;
      }

      node = node.parent;
    }

    return undefined;
  }

  private node(element: E): Node<E> {
    if(!this.root) {
      return null;
    }

    let node = this.root;

    // 遍历树形结构，查找相同的element
    while(node) {
      const cmp = this.compare(element, node.element);

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

  /**
   *
   * 删除节点
   *
   * */
  remove(element: E): void {
    let targetNode = this.node(element);

    if(!targetNode) {
      return;
    }

    // 删除的节点的度为2，查找targetNode的前驱或者后继，将前驱或者后继的element赋值给targetNode.element
    if(targetNode.hasTwoChildren()) {
      const predecessorNode = this.predecessorNode(targetNode);

      targetNode.element = predecessorNode.element;

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

  }

  protected afterRemove(node: Node<E>) {

  }

  size(): number {
    return this.sizeMember;
  }

  isEmpty() {
    return this.size() === 0;
  }

  height(): number {

    let node = this.root;

    if(!node) {
      return 0;
    }

    const queue = [];
    queue.push(node);

    // 当前层节点在队列中的个数
    let count = 1;
    let totalHeight = 0;

    while(queue.length) {
      const node = queue.shift();
      count--;

      if(node.left) {
        queue.push(node.left)
      }

      if(node.right) {
        queue.push(node.right)
      }

      // 如果当前层在队列中的已经出队完成，队列剩余节点数量就是下一层节点的数量
      if(count === 0) {
        totalHeight++;
        count = queue.length;
      }
    }

    return totalHeight;

  }

  /**
   *
   * 判断是否是完全二叉树
   *
   * */
  isComplete(): boolean {

    let node = this.root;

    if(!node) {
      return false;
    }

    // 如果node.left !== null && node.right !== null，继续判断

    // 如果node.left !== null && node.right === null 或者 node.isLeaf() 则后面节点的都为叶子节点

    // 如果node.left === null && node.right !== null，则不是完全二叉数

    const queue = [];
    queue.push(node);
    let isLeaf = false;

    while(queue.length) {

      node = queue.shift();

      // 如果isLeaf为true，则node全部为leaf node
      if(isLeaf) {
        if(node.isLeaf()) {
          continue;
        }else {
          return false;
        }
      }

      if(node.left) {
        queue.push(node.left)

        if(!node.right) {
          isLeaf = true;
        }
      }else {
        if(node.right) {  // 如果node.left === null && node.right !== null，则不是完全二叉数
          return false;
        }

        // 如果node.left !== null && node.right === null 或者 node.isLeaf() 则后面节点的都为叶子节点
        isLeaf = true;
      }

      if(node.right) { // 如果node.left !== null && node.right !== null，继续判断
        queue.push(node.right)
      }

    }

    return true;
  }

  toString(): string {
    let result = this.toStringTree(this.root.element.toString(), this.root.left, '');
    result += this.toStringTree('', this.root.right, '');
    return result;
  }

  /**
   *
   * 打印当前节点的树形结构
   *
   * */
  private toStringTree(result: string, node: Node<E>, prefix: string) {

    let str = ''

    if(!node) {
      return str;
    }

    prefix = `${prefix}[${node === node.parent.left ? 'L' : 'R'}]`;

    str += `${prefix} ${node.toString()}`;

    result = result + '\n'
    result += str;

    result += this.toStringTree('', node.left, prefix)
    result += this.toStringTree('', node.right, prefix)

    return result;
  }

}

export class Node<E> extends AbstractNode<E> {
  element: E;
  parent: Node<E>;
  left: Node<E>;
  right: Node<E>;

  constructor(element: E, parent: Node<E>) {
    super();
    this.element = element;
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
    return `${this.element.toString()}_p${this.parent.element.toString()}`
  }
}

