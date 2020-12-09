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

  private sizeMember: number;
  private root: Node<E>;

  constructor() {
    this.sizeMember = 0;
  }

  add(str: string, value: E): E {

    // 查找是否存在最后一个节点
    const node = this.node(str);
    console.log(node)
    if(node) {
      const oldValue = node.value;
      node.word = true;
      node.value = value;
      return oldValue;
    }

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

      // 查找children是否存在这个字符
      newNode = isEmptyChildren ? undefined : parent.children.get(str[i]);

      console.log("newNode", newNode)

      // 如果parent没有children或者不存在
      if(!newNode) {
        if(isEmptyChildren) {
          parent.children = new HashMap()
        }

        newNode = new Node(parent);
        newNode.char = str[i];

        parent.children.put(str[i], newNode);
      }

      // 将newNode作为parent
      parent = newNode;

    }

    // 加入最后一个节点，设置node.word属性和valu
    newNode.word = true;
    newNode.value = value;

    this.sizeMember++;

    return undefined;

  }

  clear(): void {
    this.sizeMember = 0;
    this.root = undefined;
  }

  isEmpty(): boolean {
    return this.sizeMember === 0;
  }

  remove(str: string): E {

    let node = this.node(str);
    let oldValue = node ? node.value : undefined;

    // 如果存在随后一个节点
   while(node) {

     if(node.children && node.children.size() > 0) {
       // 如果node.parent.word === true 是不会来到这里的
       node.word = false;
       break;
     }else { // 不存在最后一个节点
       // 删除本节点
       node.parent.children.remove(node.char);

       // 如果上一个节点还存在children或者上一个节点node.word
       if(node.parent.word || node.parent.children.size() > 0) {
         break;
       }

       node = node.parent;
     }

   }

    return oldValue;
  }

  size(): number {
    return this.sizeMember;
  }

  startWith(prefix: string): boolean {
    const node = this.node(prefix);
    return !!node;
  }

  /**
   *
   * 找到最后一个节点
   *
   * */
  private node(str: string): Node<E> {
    this.checkNotEmpty(str);

    if(!this.root) {
      return undefined;
    }

    let parent = this.root;
    let newNode;

    for(let i = 0; i < str.length; i++) {

      const isEmptyChildren = !parent.children;

      if(isEmptyChildren) {
        return undefined;
      }

      // 查找children是否存在这个字符
      newNode = parent.children.get(str[i]);

      // 如果parent没有children或者不存在
      if(!newNode) {

        return undefined;

      }else {
        // 将newNode作为parent
        parent = newNode;
      }

    }

    return newNode;

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
