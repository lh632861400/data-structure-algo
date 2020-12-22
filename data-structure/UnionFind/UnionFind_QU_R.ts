/**
 *
 * based on ArrayList
 * Quick Union - 基于rank的优化
 * 优化：
 * 由于树可能太高，将高度较小的树连接到高度较大的树之上
 * 查询O(ln)
 * 合并O(ln)
 *
 * @module UnionFind_QU_R
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QU_R extends IUnionFind {
  rank: number[];

  constructor(capacity: number) {
    super(capacity);

    const rank = new Array(capacity);

    for (let i = 0; i < rank.length; i++) {
      rank[i] = 1;
    }

    this.rank = rank;

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

    if(this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }else if(this.rank[p1] > this.rank[p2]) {
      this.parents[p2] = p1;
    }else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }

  }

}
