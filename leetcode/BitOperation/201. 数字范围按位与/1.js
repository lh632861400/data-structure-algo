/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/solution/shu-zi-fan-wei-an-wei-yu-by-leetcode-solution/
 *
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function(left, right) {

  // 如果有一位是0

  let shift = 0;

  while(left < right) {
    left = left >> 1;
    right = right >> 1;
    shift++;
  }

  return (left << shift)

};
