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

  static RED: boolean;
  static BLACK: boolean;

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
    this.afterAdd(grand);

  }

  /**
   *
   * node是删除的节点或者replacement节点
   *
   * */
  protected afterRemove(node: Node<E>) {

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
    return node ? (<RBNode<E>> node).color : RBTree.BLACK;
  }

  private isRed(node: Node<E>) {
    return this.colorOf(node) === RBTree.RED;
  }

  private isBlack(node: Node<E>) {
    return this.colorOf(node) === RBTree.BLACK;
  }

}

RBTree.RED = false;

RBTree.BLACK = true;

class RBNode<E> extends Node<E> {
  color: boolean;

  constructor(element: E, parent: Node<E>) {
    super(element, parent);

    this.color = RBTree.RED;
  }

  toString() {
    return `${!this.color ? 'R_' : ''}${this.element}`
  }

}
