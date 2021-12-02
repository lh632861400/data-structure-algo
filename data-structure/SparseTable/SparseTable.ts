/**
 *
 * 稀疏表
 *
 * 数据规模n 询问次数m
 *
 * 1.暴力求解
 * 时间复杂度
 * O(nm)
 * 空间复杂度
 * O(1)
 *
 * 2.打表
 * 计算dp[i][j] 左端点i右端点j区间的最值
 * O(n ^ 2 + m)
 * O(n ^ 2)
 *
 * 3.优化打表
 * 倍增 + 动态规划
 * dp[i][j] 以i为左端点2 ^ j长度区间的最值 [i, i + (2 ^ j) - 1]
 * [l, r]区间的最值可以转化为[i, i1] [i1 + 1, i2] [in, r]
 * len = r - l都可以使用而精致来表示长度1110，那么区间就可以转化为相应区间的最值的
 * O(nlgn + m)
 * O(mlgn)
 *
 * 还可以优化为
 * O(nlgn + m)
 * O(mlgn)
 * j = Math.floor(lg(r - l))
 * len = r - l
 * len可以用二进制表示len就可以使用不同长度的区间表示的
 *
 * 查询区间最值
 * max(dp[i][j], d[r - (1 << j) + 1][r]) // [l, 2 ^ j - 1] [2 ^ j, r]
 * 有重叠的区间
 *
 * 静态求区间最值
 *
 * dp[i][j] 从i开始，长度为2^j的区间的最值
 *
 * 第一种，区间可以重叠，采用两段区间来获取更大区间的最值
 * len为区间长度 len = r - l
 * j为区间最大的2的指数 j = Math.floor(log2(len))
 * dp[i][j] = max(dp[i][j - 1], dp[R - (1 << (j - 1)) + 1][j-1])
 * 都可以采用稀疏数组求解 f(a, a) = a
 *
 * @module SparseTable
 *
 * */
import {ISparseTable} from "./ISparseTable";

export  default class SparseTable implements ISparseTable {

  // dp[i][j] 从i开始，长度为2^j的区间的最值
  dp: number[][];

  constructor(arr: number[]) {

    const n = arr.length;

    this.dp = new Array(n);

    for(let i = 0; i < this.dp.length; i++) {
      this.dp[i] = new Array(Math.floor(Math.log2(n)) + 5)
    }

    // base case dp[i][0] = arr[i]
    // j为0 dp[i][2 ^ 0] [i, i + 2 ^ 0 - 1] dp[i][i]
    for(let i = 0; i < n; i++) {
      this.dp[i][0] = arr[i]
    }

    const max = Math.log2(n);

    // 定义状态转移方程
    for(let j = 1; j <= max; j++) {

      for(let i = 0; (i + (1 << j) - 1) < n; i++) {

        this.dp[i][j] = Math.max(this.dp[i][j - 1], this.dp[i + (1 << (j - 1))][j - 1])

      }

    }

  }

  query(L: number, R: number): number {

    const j = Math.floor(Math.log2(R - L));

    return Math.max(this.dp[L][j], this.dp[R - (1 << j) + 1][j])
  }

}

