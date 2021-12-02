/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/single-number-ii/solution/zhi-chu-xian-yi-ci-de-shu-zi-ii-by-leetc-23t6/
 *
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {

  let len = nums.length;

  let result = 0;

  for(let i = 0; i < 32; i++) {

    let total = 0;

    for(let j = 0; j < len; j++) {
      total = total + (nums[j] & (1 << i));
    }

    if(total % 3 !== 0) {
      result += (1 << i)
    }

  }

  return result

};
