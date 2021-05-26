/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/strange-printer/solution/qi-guai-de-da-yin-ji-by-leetcode-solutio-ogbu/
 *
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {

  const len = s.length;

  const dp = new Array(len).fill(0);

  for(let i = 0; i < dp.length; i++) {
    dp[i] = new Array(len).fill(0)
  }

  for(let i = len - 1; i >= 0; i--) {

    dp[i][i] = 1;

    for(let j = i + 1; j < len; j++) {

      if(s[i] === s[j]) {
        dp[i][j] = dp[i][j - 1]
      }else {

        let min = Number.MAX_SAFE_INTEGER;

        for(let k = i; k < j; k++) {
          min = Math.min(min, dp[i][k] + dp[k + 1][j])
        }

        dp[i][j] = min;

      }

    }

  }

  return dp[0][len - 1]

};
