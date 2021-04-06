/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/volume-of-histogram-lcci/solution/zhi-fang-tu-de-shui-liang-by-leetcode-so-7rla/
 *
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {

  const length = height.length
  const leftMax = new Array(length);
  const rightMax = new Array(length);

  leftMax[0] = height[0];

  rightMax[0] = height[length - 1]

  for(let i = 1; i < length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  for(let i = length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let sum = 0;

  for(let i = 0; i < length; i++) {
    sum += Math.min(leftMax[i], rightMax[i]) - height[i]
  }

  return sum;

};
