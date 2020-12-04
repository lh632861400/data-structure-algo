/**
 *
 * thoughts:
 * 动态规划
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if(!s) {
    return 0;
  }

  // dp[i] i个字符为结尾的连续子窜的长度
  // dp[i + 1] = dp[i] + 1 | 遍历长度
  let sum = 1;
  const dp = new Array(s.length + 1);
  dp[0] = 0;
  dp[1] = 1;

  for(let i = 2; i < dp.length; i++) {

    let searched = false;
    let count = 0;
    // 判断s[i - 1]的字符是否存在dp[i - 1]中
    for(let j = 1; j <= dp[i - 1]; j++) {
      if(s[i - 1] === s[i - 1 - j]) {
        searched = true;
        break;
      }

      count++;
    }

    if(searched) {
      dp[i] = count + 1;
    }else {
      dp[i] = dp[i - 1] + 1;
    }

    sum = Math.max(sum, dp[i]);


  }

  return sum;

};
