/**
 *
 * thoughts:
 * 回溯
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function(nums) {

  if(nums.length <= 1) {
    return []
  }

  const visited = new Set();

  const results = [];

  for(let i = 0; i < nums.length; i++) {
    backtrace(nums, results, visited, [nums[i]], i)
  }

  return results;

};

let str = ''
function backtrace(nums, results, visited, result, i) {

  // base case
  if(i >= nums.length) {
    return;
  }

  for(let start = i + 1; start < nums.length; start++) {

    if(nums[start] < result[result.length - 1]) {

      continue;

    }

    result.push(nums[start])

    str = result.join(",");

    if(result.length > 1 && !visited.has(str)) {
      results.push(result.slice(0));
      visited.add(str);
    }

    // 回溯
    backtrace(nums, results, visited, result, start);

    // 撤销选择
    result.pop();

  }

}
