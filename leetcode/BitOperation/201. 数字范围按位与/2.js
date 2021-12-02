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

  while(left < right) {
    right = right & (right - 1)
  }

  return right;

};
