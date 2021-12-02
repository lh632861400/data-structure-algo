/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/single-number-iii/solution/zhi-chu-xian-yi-ci-de-shu-zi-iii-by-leet-4i8e/
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {

  let result = 0;

  for(let i = 0; i < nums.length; i++) {
    result = result ^ nums[i]
  }

  // 得到第一个不为0的位

  let div = result & (-result);

  let a = 0;
  let b = 0;

  for(let i = 0; i < nums.length; i++) {

    if((nums[i] & div) === 0) {
      a = a ^ nums[i]
    }else {
      b = b ^ nums[i]
    }

  }

  return [a, b]

};
