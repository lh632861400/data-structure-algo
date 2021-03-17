/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/distinct-subsequences/solution/bu-tong-de-zi-xu-lie-by-leetcode-solutio-urw3/
 *
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {

  const m = s.length;

  const n = t.length;

  if(m < n) {
    return 0;
  }

  const dp = new Array(m + 1).fill(0)

  for(let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1)
  }

  // dp[i][j] s[i:] t[j:] s的第i个元素一直到元素末尾和t的第j个元素一直到末尾所匹配子序列

  // base case

  for(let i = 0; i <= n; i++) {
    dp[m][i] = 0;
  }

  for(let i = 0; i <= m; i++) {
    dp[i][n] = 1;
  }

  // 确定状态转移方程
  for(let i = m - 1; i >=0; i--) {

    for(let j = n - 1; j >= 0; j--) {

      if(s[i] === t[j]) {
        dp[i][j] = dp[i+1][j+1] + dp[i + 1][j]
      }else {
        dp[i][j] = dp[i + 1][j]
      }

    }

  }

  return dp[0][0]

};
