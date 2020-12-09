/**
 *
 * based on HashMap
 *
 * @module Trie
 *
 * 字典树
 *
 * */
import {ITrie} from "./ITrie";
import HashMap from "../HashMap/HashMap";

export default class Trie<E> implements ITrie<E> {

  sizeMember: number;
  root: Node<E>;

  add(str: string, value: E): void {

    this.checkNotEmpty(str);

    // 如果root为null，则直接生成Node<E>
    if(!this.root) {
      this.root = new Node(undefined);
    }

    let parent = this.root;
    let newNode;

    // 将每一个字符加入到字典树
    for(let i = 0; i < str.length; i++) {

      const isEmptyChildren = !parent.children;
      if(isEmptyChildren) {
        parent.children = new HashMap();
      }

      newNode = new Node(parent);
      newNode.char = str[i];

      parent.children.put(str[i], newNode);

      // 将newNode作为parent
      parent = newNode;

    }

    // 加入最后一个节点，设置node.word属性和valu
    newNode.word = true;
    newNode.value = value;

  }

  clear(): void {
    this.sizeMember = 0;
    this.root = undefined;
  }

  isEmpty(): boolean {
    return this.sizeMember === 0;
  }

  remove(str: string): E {
    return undefined;
  }

  size(): number {
    return this.sizeMember;
  }

  startWith(prefix: string): boolean {
    return false;
  }

  /**
   *
   * 找到最后一个节点
   *
   * */
  private node(str: string): Node<E> {

    return undefined;

  }

  private checkNotEmpty(str: string) {
    if(str === undefined || str === null || str === '') {
      throw new Error('str must not be null');
    }
  }

}

class Node<E> {
  children: HashMap<string, Node<E>>;
  parent: Node<E>;
  char: string;
  value: E;
  word: boolean;

  constructor(parent: Node<E>) {
    this.parent = parent;
  }
}
