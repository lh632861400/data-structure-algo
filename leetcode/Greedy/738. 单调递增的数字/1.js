/**
 *
 * thoughts:
 * 贪心
 * https://leetcode-cn.com/problems/monotone-increasing-digits/solution/dan-diao-di-zeng-de-shu-zi-by-leetcode-s-5908/
 * O(n)
 * O(1)
 *
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {

  let str = N + "";
  const arr = str.split("");

  let i = 1;

  // 查找第一个不满足条件的位置的索引
  while(i < str.length && arr[i - 1].charCodeAt(0) <= arr[i].charCodeAt(0)) {
    i++;
  }

  if(i < str.length) {
    while(i > 0 && arr[i - 1].charCodeAt(0) > arr[i].charCodeAt(0)) {
      arr[i - 1] = (arr[i - 1] - 1) + "";
      i--;
    }

    for(i = i + 1; i < str.length; i++) {
      arr[i] = '9'
    }
  }

  str = arr.join("");

  return str * 1;


};
