/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/solution/javacong-bao-li-kai-shi-you-hua-pei-tu-pei-zhu-shi/
 * 暴力求解 + 动态规划
 *
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function(matrix, k) {

  const rows = matrix.length;
  const cols = matrix[0].length;
  let max = Number.MIN_SAFE_INTEGER;

  const dp = new Array(rows + 1);

  for(let i = 0; i - 1 < rows; i++) {
    dp[i] = new Array(cols + 1);

    for(let j = 0; j - 1 < cols; j++) {
      dp[i][j] = new Array(rows + 1);

      for(let i1 = 0; i1 - 1 < rows; i1++) {
        dp[i][j][i1] = new Array(cols + 1).fill(0);
      }
    }
  }

  for(let i1 = 1; i1 <= rows; i1++) {
    for(let j1 = 1; j1 <= cols; j1++) {
      dp[i1][j1][i1][j1] = matrix[i1 - 1][j1 - 1];

      for(let i2 = i1; i2 <= rows; i2++) {
        for(let j2 = j1; j2 <= cols; j2++) {
          dp[i1][j1][i2][j2] = dp[i1][j1][i2 - 1][j2] + dp[i1][j1][i2][j2 - 1] - dp[i1][j1][i2 - 1][j2 - 1] + matrix[i2 - 1][j2 - 1]

          if(dp[i1][j1][i2][j2] <= k && dp[i1][j1][i2][j2] > max) {
            max = dp[i1][j1][i2][j2];

          }

        }
      }
    }
  }

  return max;

};
