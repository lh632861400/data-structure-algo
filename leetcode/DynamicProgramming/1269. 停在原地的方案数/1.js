/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/solution/ting-zai-yuan-di-de-fang-an-shu-by-leetcode-soluti/
 *
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
var numWays = function(steps, arrLen) {

  const MOD = 10e9 + 7;

  const len = Math.min(steps, arrLen - 1);

  const dp = new Array(steps + 1).fill(0);

  for(let i = 0; i < dp.length; i++) {
    dp[i] = new Array(len + 1).fill(0);
  }

  dp[0][0] = 1;

  for(let i = 1; i <= steps; i++) {

    for(let j = 0; j <= len; j++ ) {

      dp[i][j] = dp[i - 1][j];

      if(j - 1 >= 0) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
      }

      if(j < len) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j + 1]) % MOD;
      }

    }

  }

  return dp[steps][0]

};
