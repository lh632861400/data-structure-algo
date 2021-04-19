/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/scramble-string/solution/rao-luan-zi-fu-chuan-by-leetcode-solutio-8r9t/
 *
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {

  const n = s1.length;

  const memo = new Array(n).fill(0);

  for(let i = 0; i < n; i++) {
    memo[i] = new Array(n).fill(0);

    for(let j = 0; j < n; j++) {
      memo[i][j] = new Array(n + 1).fill(0)
    }
  }

  return dfs(memo, s1, 0, s2, 0, n)

};

function dfs(memo, s1, i1, s2, i2, length) {

  if(memo[i1][i2][length] !== 0) {
    return memo[i1][i2][length] === 1;
  }

  // 判断两个子串知否相等
  if(s1.substring(i1, i1 + length) === s2.substring(i2, i2 + length)) {
    memo[i1][i2][length] = 1;
    return true;
  }

  // 判断两个子串
  if(!isSimilar(s1.substring(i1, i1 + length), s2.substring(i2, i2 + length))) {
    memo[i1][i2][length] = -1;
    return false;
  }

  // 枚举
  for(let i = 1; i < length; i++) {

    if(dfs(memo, s1, i1, s2, i2, i) && dfs(memo, s1, i1 + i, s2, i2 + i, length - i)) {
      memo[i1][i2][length] = 1;
      return true;
    }

    if(dfs(memo, s1, i1, s2, i2 + length - i, i) && dfs(memo, s1, i1 + i, s2, i2, length - i)) {
      memo[i1][i2][length] = 1;
      return true;
    }

  }

  memo[i1][i2][length] = -1;

  return false;

}

function isSimilar(s1, s2) {

  const map = new Map();

  for(let i = 0; i < s1.length; i++) {
    map.set(s1[i], (map.get(s1[i]) || 0) + 1);
  }

  for(let i = 0; i < s2.length; i++) {
    map.set(s2[i], (map.get(s2[i]) || 0) - 1);
  }

  for(let [key, value] of map) {
    if(value !== 0) {
      return false;
    }
  }

  return true;

}
