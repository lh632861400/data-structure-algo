/**
 *
 *
 * thoughts:
 * 减去缺少的数字
 *
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {

  const n = nums.length;

  const total = (n & 1) === 0 ? (1 + n) * n / 2 : n * (n - 1) / 2 + n;

  let res = 0;
  for(let i = 0; i < n; i++) {
    res += nums[i]
  }

  return total - res;

};
