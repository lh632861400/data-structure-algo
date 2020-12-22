/**
 *
 * based on ArrayList
 * Quick Union - 基于size的优化
 * 优化：
 * 由于树可能太高，需要合并时降低树的高度
 * 查询O(ln)
 * 合并O(ln)
 *
 * @module UnionFind_QU
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QU_S extends IUnionFind {
  sizes: number[];

  constructor(capacity: number) {
    super(capacity);

    const sizes = new Array(capacity);

    for (let i = 0; i < sizes.length; i++) {
      sizes[i] = 1;
    }

    this.sizes = sizes;

  }

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

    if(this.sizes[p1] < this.sizes[p2]) {
      this.parents[p1] = p2;
      this.sizes[p2] += this.sizes[p1]
    }else {
      this.parents[p2] = p1;
      this.sizes[p1] += this.sizes[p2]
    }

  }

}
