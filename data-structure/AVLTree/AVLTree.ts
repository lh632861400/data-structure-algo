/**
 *
 * 添加一个节点
 * 可能会增加祖先节点的高度，可能会使所有祖先节点失衡，但是只要调整高度最低的那个失衡的祖先节点，整棵树就能够平衡，调整的复杂度为O(1)
 *
 *
 * 删除一个节点
 * 可能会减少祖先节点的高度或者高度不变，可能会使父节点或者所有祖先节点失衡，需要调整从高度最低的失衡的祖先节点，调整后可能向上的祖先节点也失衡，一直调整到更节点，调整的复杂度为O(logn)
 *
 * @module AVLTree
 *
 * */
import BinarySearchTree, { Node } from "./BinarySearchTree";
import {Comparator} from "./IBinarySearchTree";

export default class AVLTree<E> extends BinarySearchTree<E> {

  constructor(comparator?: Comparator<E>) {
    super(comparator);
  }

  protected createNode(element: E, parent: Node<E>): Node<E> {
    return new AVLNode(element, parent)
  }

  protected afterAdd(node: Node<E>) {

    console.log(node)

    // 调整树节点
    while((node = node.parent)) {

      if(this.isBalanced(node)) { // 如果节点没有失衡

        // 更新节点高度
        this.updateHeight(node)

      }else { // 如果节点失去平衡

        // 调整节点,重新计算节点高度

        this.reBalance(node);

        break;

      }

    }
  }

  private reBalance(grand: Node<E>) {

    // 得到高度较高的子节点
    const parent = (<AVLNode<E>> (<AVLNode<E>> grand).tallerNode());
    const node = (<AVLNode<E>> (<AVLNode<E>> parent).tallerNode())

    if(parent === grand.left) { // L

      if(node === parent.left) { // LL

        // 进行右旋
        this.rotateRight(grand)

      }else { // LR

        this.rotateLeft(parent);
        this.rotateRight(grand);

      }

    }else { // R

      if(node === parent.left) { // RL

        this.rotateRight(parent);
        this.rotateLeft(grand);

      }else { // RR

        this.rotateLeft(grand)

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

    // 先计算高度低的节点
    this.updateHeight(grand)
    this.updateHeight(parent)

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

    // 先计算高度低的节点
    this.updateHeight(grand)
    this.updateHeight(parent)

  }

  private isBalanced(node: Node<E>) {

    return (<AVLNode<E>> node).isBalanced();
  }

  private updateHeight(node: Node<E>) {
    (<AVLNode<E>> node).updateHeight();
  }

}

class AVLNode<E> extends Node<E> {
  height: number;

  constructor(element: E, parent: Node<E>) {
    super(element, parent);
    this.height = 1;
  }

  isBalanced() {
    const leftHeight = this.left ? (<AVLNode<E>> this.left).height : 0;
    const rightHeight = this.right ? (<AVLNode<E>> this.right).height : 0;

    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  updateHeight() {

    const leftHeight = this.left ? (<AVLNode<E>> this.left).height : 0;
    const rightHeight = this.right ? (<AVLNode<E>> this.right).height : 0;

    this.height = Math.max(leftHeight, rightHeight) + 1;
  }

  tallerNode() {
    const leftHeight = this.left ? (<AVLNode<E>> this.left).height : 0;
    const rightHeight = this.right ? (<AVLNode<E>> this.right).height : 0;
    if(leftHeight > rightHeight) {
      return this.left;
    }else if(leftHeight < rightHeight) {
      return this.right
    }else {
      if(this.isLeftChild()) {
        return this.left
      }else {
        return this.right;
      }
    }
  }

  toString() {
    return `${this.element.toString()}_p${this.parent.element.toString()}_h(${this.height})`
  }
}
