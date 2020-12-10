/**
 *
 * thoughts:
 * 动态规划
 * O(m * n)
 * O(m * n)
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {

  // dp(i ,j)为到(i ,j)位置路径的个数
  // 状态转移方程 dp(i, j) = dp(i - 1, j) + dp(i, j - 1)
  // 初始条件dp(0, 0)为1 dp(0, j)为1 dp(i, 0)为1

  const dp = new Array(m);
  for(let i = 0; i < m; i++) {
    dp[i] = new Array(n);
  }

  // 设置初始条件
  for(let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  for(let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1]

};
