/**
 *
 * 线段树
 *
 * 区间操作
 *
 * @module SegmentTree
 *
 * */
import {ISegmentTree} from "./ISegmentTree";


export default class SegmentTree implements ISegmentTree {

  tree: number[];

  arr: number[];

  constructor(arr: number[]) {

    this.arr = arr;

    this.tree = new Array(arr.length * 4 + 5);

    this.treeify(1, 0, arr.length - 1);

  }

  /**
   *
   *
   * 根据arr构建线段树
   *
   * @param {number} node - 线段树节点索引从1开始
   * @param {number} start - 原数组开始索引
   * @param {number} end - 原数组结束索引
   *
   * */
  treeify(node: number, start: number, end: number) {

    // base case
    if(start === end) {
      this.tree[node] = this.arr[start];
      return;
    }

    const mid = start + ((end - start) >> 1);

    const leftNode = (node << 1) | 1;

    const rightNode = leftNode + 1;

    this.treeify(leftNode, start, mid);
    this.treeify(rightNode, mid + 1, end);

    this.tree[node] = this.tree[leftNode] + this.tree[rightNode];

  }

  /**
   *
   *
   * 查询某个区间
   *
   * @param {number} L - 原数组中的索引
   * @param {number} R - 原数组的索引
   *
   * */
  query(L: number, R: number): number {

    return this.queryNode(1, 0, this.arr.length - 1, L, R);

  }

  queryNode(node: number, start: number, end: number, L: number, R: number) {

    if(R < start || L > end) {
      return 0;
    }else if(L <= start && end <= R) {
      return this.tree[node]
    }else if(start === end) {
      return this.tree[node]
    }

    const mid = start + ((end - start) >> 1);

    const leftNode = (node << 1) | 1;

    const rightNode = leftNode + 1;

    const leftSum = this.queryNode(leftNode, start, mid, L, R);
    const rightSum = this.queryNode(rightNode, mid + 1, end, L, R);

    return leftSum + rightSum;

  }

  /**
   *
   *
   * 单点更新
   *
   * @param {number} idx - 原数组中的索引
   * @param {number} value - 新的数组值
   *
   * */
  update(idx: number, value: number): void {

    this.updateNode(idx, value, 1, 0, this.arr.length - 1)

  }

  updateNode(idx: number, value: number, node: number, start: number, end: number) {

    // base case
    if(start === end) {
      this.arr[idx] = value;
      this.tree[node] = value;
      return;
    }

    const mid = start + ((end - start) >> 1);

    const leftNode = (node << 1) | 1;

    const rightNode = leftNode + 1;

    if(idx <= mid) {
      // 更新左子树
      this.updateNode(idx, value, leftNode, start, mid);
    }else {
      // 更新右子树
      this.updateNode(idx, value, rightNode, mid + 1, end);
    }

    this.tree[node] = this.tree[leftNode] + this.tree[rightNode];

  }

}
