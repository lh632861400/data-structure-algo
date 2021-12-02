/**
 *
 * 树状数组
 *
 * 动态前缀和
 *
 * 主要利用二进制表示当前节点所能够管理的区间操作
 * 二进制lowerbit就是管理的区间大小
 *
 * a代表原数组
 * b代表差分数组
 * c代表树状数组
 *
 * 特性：
 *  i小标从1开始
 *  i下标所管辖的范围长度为lowerbit(i) [i - lowerbit(i) + 1, i]
 *  c[i]代表所管辖范围的前缀和
 *  i - lowerbit(i)代表左侧相邻的管辖范围的右端点
 *  c[i]所管辖范围的直接子节点 i i - 2 ^ 0, i - 2 ^ 1 ... i - 2 ^ k, 2 ^ k < lowerbit(i) 管辖范围长度不能查过lowerbit(i)
 *  父节点 p = i + lowerbit(i)
 *
 *  差分数组
 *    当修改原数组a l - r范围的数据都增加delta
 *    那么差分数组b[l] = b[l] + delta b[r + 1] = b[r + 1] - delta
 *
 *
 *  单点修改区间查询
 *  使用树状数组查询
 *
 *  区间修改单点查询
 *  使用差分数组计算成树状数组查询
 *
 *  区间修改区间查询
 *  使用差分数组计算的树状数组查询
 *  a1 + ... an = (n + 1)(b1 + ... bn) - (ibi1 + ... ibin)
 *
 *  区间最值
 *  使用树状数组查询只是树状数组的每一个节点值是管辖范围的最值
 *  可以动态求区间最值
 *
 *
 * @module BinaryIndexedTree
 *
 * */
import {IBIT} from "./IBIT";

export default class BinaryIndexedTree implements IBIT {

  // 原数组
  A: number[]

  // 树状数组
  C: number[]

  // 元素个数
  n: number

/**
 *
 *
 * 节点所管辖范围长度 [i - lowerbit(i) + 1, i]
 * @params {number} x - 当前元素下标
 *
 * */
  lowerbit(x) {
    return x & (-x)
  }

  /**
   *
   *
   * 当前节点左边的管辖范围的右端点下标
   * @params { number } i - 当前元素下标
   *
   * */
  left(i: number) {
    return i - this.lowerbit(i)
  }

  /**
   *
   *
   * 当前元素的父节点
   * @params { number } i - 当前元素
   *
   * */
  parent(i: number) {
    return i + this.lowerbit(i)
  }

  constructor(arr: number[]) {
    this.A = [0, ...arr];
    this.C = new Array(arr.length + 5).fill(0);
    this.n = this.A.length;
  }

  treeify() {

    for(let i = 1; i <= this.A[0]; i++) {
      this.update(i, this.A[i])
    }

  }

  /**
   *
   *
   * 查询[1, i]元素前缀和
   *
   * */
  private queryPrefix(i: number) {

    let sum = this.C[i];

    const maxLen = this.lowerbit(i)

    // 一定要小于maxLen
    // i - lowerbit(i)已经是另外的管辖范围
    for(let j = 0; (1 << j) < maxLen; j++) {
      sum += this.C[i - (1 << j)]
    }

    return sum;

  }

  /**
   *
   *
   * 查询[l, r]之间的前缀和
   *
   * */
  query(l: number, r: number) {

    return this.queryPrefix(r) - this.queryPrefix(l)

  }

  /**
   *
   *
   * 更新原数组i下标的元素增加delta
   *
   * */
  update(i: number, delta: number) {

    const n = this.n;

    while(i <= n) {

      // 更新当前c[i]
      this.C[i] = this.C[i] + delta;

      // 更新父节点
      i = this.parent(i)

    }

  }

}

