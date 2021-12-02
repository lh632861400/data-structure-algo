/**
 *
 *
 * thoughts:
 * 回溯
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {

  const result = [];

  let value = [];

  result.push(value)

  backtrace(result, value, nums, 0)

  return result;

};

function backtrace(result, prev, nums, start) {

  // base case
  if(start >= nums.length) {
    return;
  }

  // 选择列表
  for(let i = start; i < nums.length; i++) {

    // 做出选择
    let value = [...prev, nums[i]];

    result.push(value)

    // 继续回溯
    backtrace(result, value, nums, i + 1);

    // 撤销选择

  }

}
