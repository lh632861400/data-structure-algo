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

    while(v1 !== this.parents[v1]) {

      const p = this.parents[v1];
      this.parents[v1] = v2;

      v1 = p;

    }

  }

}
