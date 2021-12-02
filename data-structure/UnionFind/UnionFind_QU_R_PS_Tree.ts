/**
 *
 * based on ArrayList
 * Quick Union - 基于rank的优化 - 进行路径分裂(Path Spliting) 任意数据类型
 * 优化：
 * 每一个节点在find时，指向grand
 * 查询O(ln)
 * 合并O(ln)
 *
 * @module UnionFind_QU_R_PS
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QU_R_PS_Tree<V> {
  private map;

  constructor() {
   this.map = new Map<V, Node<V>>();
  }

  isSame(v1: number, v2: number) {
    return this.find(v1) === this.find(v2);
  }

  protected check<V>(v: V) {
    if(v === undefined || v === null) {
      throw new Error('v must not be null')
    }
  }

  find<V>(v: V): V {
    this.check(v);

    const node = this.findNode(v);

    return node.value;
  }

  private findNode<V>(v: V) {

    let node = this.map.get(v);

    if(!node) {

      node = new Node(v);

      this.map.set(v, node);

      return node;
    }

    while(node.parent !== node) {
      let parent = node.parent;
      node.parent = node.parent.parent;
      node = parent;
    }

    return node;

  }

  union<V>(v1: V, v2: V): void {

    this.check(v1);
    this.check(v2);

    const p1 = this.findNode(v1);
    const p2 = this.findNode(v2);

    if(p1.rank < p2.rank) {
      p1.parent = p2;
    }else if(p1.rank > p2.rank) {
      p2.rank = p1;
    }else {
      p1.parent = p2;
      p2.rank++;
    }

  }

}

class Node<V> {

  value: V;
  parent: Node<V>;
  rank: number;

  constructor(value: V, parent?: Node<V>, rank?: number) {
    this.value = value;
    this.parent = parent || this;
    this.rank = rank || 1;
  }
}
