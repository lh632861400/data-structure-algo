/**
 *
 * based on ArrayList
 * Quick Union - 根节点直接连接，树的高度不定
 * 查询O(ln)
 * 合并O(ln)
 *
 * @module UnionFind_QU
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QU extends IUnionFind {

  find(v: number): number {
    this.check(v);

    // 如果v !== parents[v]，则继续需要向parent遍历
    while(v !== this.parents[v]) {

      v = this.parents[v]

    }

    return v;
  }

  union(v1: number, v2: number): void {

    this.check(v1);
    this.check(v2);

    if(v1 === v2) return;

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    this.parents[p1] = p2;

  }

}
