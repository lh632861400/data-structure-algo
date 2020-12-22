/**
 *
 * based on ArrayList
 * Quick Union - 基于rank的优化 - 进行路径压缩(Path Compression)
 * 优化：
 * 每一个节点在find时，指向根节点
 * 查询O(ln)
 * 合并O(ln)
 *
 * @module UnionFind_QU_R_PC
 *
 * 并查集
 *
 * */
import IUnionFind from "./IUnionFind";

export default class UnionFind_QU_R_PC extends IUnionFind {
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

    if(v !== this.parents[v]) {
      this.parents[v] = this.find(this.parents[v])
    }

    return this.parents[v]
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
