/**
 *
 *
 * @module Stack
 *
 * */
import IBinarySearchTree, {AbstractNode, Comparator, Visitor} from "./IBinarySearchTree";
import Queue from "../Queue/Queue";

export default class BinarySearchTree<E> {
  private root: Node<E>;
  private sizeMember: number;
  private comparator: Comparator<E>;

  constructor(comparator?: Comparator<E>) {
    this.sizeMember = 0;
    this.comparator = comparator;
  }

  add(element: E): void {
    if(!this.root) {
      this.root = new Node<E>(element, null);
      this.sizeMember++;

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
    if(cmp < 0) { // 添加到left
      parent.left = new Node<E>(element, parent)
    }else { // 添加到right
      parent.right = new Node<E>(element, parent)
    }

    this.sizeMember++;
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

  clear(): void {
  }

  contains(element: E): boolean {
    return false;
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
        console.log(node.element)
        node = node.right;
      }

      return node;
    }

    // 寻找node.parent.parent.parent 到 node 的祖先节点某一个右子树上
    while (node.parent) {
      if(node === node.parent.right) {
        return node.parent;
      }
    }

    return undefined;
  }

  successor(element: E): E {
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

  remove(element: E): void {
  }

  size(): number {
    return this.sizeMember;
  }

  isEmpty() {
    return this.size() === 0;
  }

  height(): number {
    return 0;
  }

  isComplete(): boolean {
    return false;
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

    str += `${prefix} ${node.element.toString()}_p${node.parent.element.toString()}`;

    result = result + '\n'
    result += str;

    result += this.toStringTree('', node.left, prefix)
    result += this.toStringTree('', node.right, prefix)

    return result;
  }

}

class Node<E> extends AbstractNode<E> {
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
}

