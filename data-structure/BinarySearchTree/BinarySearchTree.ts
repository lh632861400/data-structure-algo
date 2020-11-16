/**
 *
 *
 * @module Stack
 *
 * */
import IBinarySearchTree, {AbstractNode, Visitor} from "./IBinarySearchTree";
import Queue from "../Queue/Queue";

export default class BinarySearchTree<E> {
  private root: Node<E>;
  private sizeMember: number;

  constructor() {
    this.sizeMember = 0;
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
    if(!node) {
      return;
    }

    console.log(node.element);
    this.preorderNode(node.left, visitor);
    this.preorderNode(node.right, visitor);

  }

  inorder(): void {

  }

  postorder(): void {
  }

  levelOrder(): void {

    const queue = new Queue<Node<E>>();

    queue.enqueue(this.root);

    // 遍历当前节点的左节点和右节点，加入到队列
    while(!queue.isEmpty()) {

      const node = queue.dequeue();

      console.log(node.element);

      if(node.left) {
        queue.enqueue(node.left);
      }

      if(node.right) {
        queue.enqueue(node.right);
      }
    }

  }

  predecessor(node: Node<E>): Node<E> {
    return undefined;
  }

  successor(node: Node<E>): Node<E> {
    return undefined;
  }
  remove(element: E): void {
  }

  size(): number {
    return this.sizeMember;
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
  toStringTree(result: string, node: Node<E>, prefix: string) {

    let str = ''

    if(!node) {
      return str;
    }

    prefix = `${prefix}[${node === node.parent.left ? 'L' : 'R'}]`;

    str += `${prefix} ${node.element.toString()}`;

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
}

