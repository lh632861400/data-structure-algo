/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/power-of-four/solution/4de-mi-by-leetcode-solution-b3ya/
 *
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {

  return (n > 0) && (n & (n - 1)) === 0 && !(n & (0b10101010101010101010101010101010))

};
