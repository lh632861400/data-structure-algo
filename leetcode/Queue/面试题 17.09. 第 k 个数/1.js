/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/get-kth-magic-number-lcci/solution/mian-shi-ti-1709-di-k-ge-shu-java-dong-tai-gui-hua/
 * dp[i]为第i个数只包含3 5 7素因子
 *
 * dp[0] = 1;
 *
 * dp[i] = min(dp[p3] * 3, dp[p5] * 5, dp[p7] * 7)
 *
 * @param {number} k
 * @return {number}
 */
var getKthMagicNumber = function(k) {

  if(k === 1) {

    return 1;

  }

  const dp = [];
  let p3 = 0;
  let p5 = 0;
  let p7 = 0;

  dp[0] = 1;

  for(let i = 1; i < k; i++) {

    // 得到一个最小的包含这些数
    dp[i] = Math.min(dp[p3] * 3, dp[p5] * 5, dp[p7] * 7)

    // 改变基准的数
    if(dp[p3] * 3 === dp[i]) p3++;
    if(dp[p5] * 5 === dp[i]) p5++;
    if(dp[p7] * 7 === dp[i]) p7++;

  }

  return dp[k - 1]

};
