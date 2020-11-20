/**
 *
 * 红黑树:
 * 红黑树性质
 * 所有节点的颜色为红色或者黑色
 * 根节点为黑色
 * 所有外部节点(null节点)为黑色
 * 红色节点的子节点只能为黑色节点
 * 任意一个节点带外部节点的路径中黑色节点的个数一样
 *
 * B树：
 * m阶B树
 * 根节点的元素个数满足 1 <= count <= m - 1
 *
 * 红黑树的平衡性:
 * 类比4阶B树：
 * 黑色节点在中间，红色节点在两边(节点个数为0、1、2)，只有在丄溢或者下溢时B树的高度才会改变
 *
 * 红黑树本身性质：
 * 红色节点的子节点一定是黑色节点，这样任意一个节点到目标节点的路径不会是到其他节点路径的2倍
 *
 *
 * 红黑树添加节点：
 * 4 + 4 + 4
 * 第一种：
 * 添加的节点的父节点是黑色，则什么都不用操作
 * 第二种：
 * 添加的节点的父节点是红色，并且grand是度为1的节点，则black(parent), red(grand), red(node), 旋转调整
 * 第三种：
 * 添加的节点的父节点是红色，并且grand是度为2的节点，在4阶B树结构下会产生丄溢，把原来B树节点的中间黑色节点变为red(grand), black(parent), black(uncle)这样在B树结构下就会产生两个新的子节点，原来的grand作为新添加的节点丄溢到上一个B树节点中，重复操作
 *
 * @module RBTree
 *
 * */
import BinarySearchTree, { Node } from "./BinarySearchTree";
import {Comparator} from "./IBinarySearchTree";

export default class RBTree<E> extends BinarySearchTree<E> {

  constructor(comparator?: Comparator<E>) {
    super(comparator);
  }

  static RED = false;
  static BLACK = true;

  protected afterAdd(node: Node<E>) {

    // 如果添加的节点是根节点，则black(node)
    if(!node.parent) {
      this.black(node);
      return;
    }

    // 如果添加的节点不是根节点，并且node.parent是black，则什么都不用操作
    if(this.isBlack(node.parent)) {
      return;
    }

    // 如果添加的节点不是根节点，是grand度为1，则进行变色和旋转操作
    let grand = node.parent.parent;
    let parent = node.parent;
    if(this.isRed(node.parent) && !grand.hasTwoChildren()) {

      if(parent.isLeftChild()) { // L

        // 相同的变色操作
        this.red(grand);

        if(node.isLeftChild()) { // LL

          this.black(parent);
          this.red(node);
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
          this.red(node);
          this.rotateLeft(grand)
          return;

        }

      }
    }

    // 如果添加的节点不是根节点，并且grand的度为2，则在B树结构下产生丄溢，丄溢的节点作为新添加的节点操作

    const uncle = parent.isLeftChild() ? grand.right : grand.left;
    this.black(parent);
    this.black(uncle);
    this.red(grand);
    this.afterAdd(grand);

  }

  private rotateLeft(grand: Node<E>) {

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

  private rotateRight(grand: Node<E>) {

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

  protected createNode(element: E, parent: Node<E>): Node<E> {
    return new RBNode(element, parent);
  }

  private color(node: Node<E>, color: boolean): RBNode<E> {
    (<RBNode<E>> node).color = color;
    return node as RBNode<E>;
  }

  private red(node: Node<E>) {
    this.color(node, RBTree.RED);
  }

  private black(node: Node<E>) {
    this.color(node, RBTree.BLACK)
  }

  private colorOf(node: Node<E>) {
    return (<RBNode<E>> node).color;
  }

  private isRed(node: Node<E>) {
    return this.colorOf(node) === RBTree.RED;
  }

  private isBlack(node: Node<E>) {
    return this.colorOf(node) === RBTree.BLACK;
  }

}

class RBNode<E> extends Node<E> {
  color: boolean;

  constructor(element: E, parent: Node<E>) {
    super(element, parent);

    this.color = RBTree.RED;
  }

}
