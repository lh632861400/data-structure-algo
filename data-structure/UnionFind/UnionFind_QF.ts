/**
 *
 * based on ArrayList
 * Quick Find - 集合所在树的高度最高
 * 查询O(1)
 * 合并O(n)
 *
 * @module UnionFind_QF
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QF extends IUnionFind {

  find(v: number): number {
    this.check(v);

    return this.parents[v];
  }

  union(v1: number, v2: number): void {

    this.check(v1);
    this.check(v2);

    if(v1 === v2) return;

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    for(let i = 0; i < this.parents.length; i++) {
      if(this.parents[i] === p1) {
        this.parents[i] = p2;
      }
    }

  }

}
