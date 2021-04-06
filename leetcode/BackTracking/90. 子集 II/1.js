/**
 *
 * thoughts:
 * backtrace
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {

  const visited = new Set();

  const result = [];

  nums.sort((a, b) => {
    return a - b;
  })

  backtrace(result, nums, visited, '', 0)

  return result;

};

function backtrace(result, nums, visited, str, start) {

  // base case
  if(!visited.has(str)) {
    if(!str) {
      result.push([])
    }else {
      result.push(str.split("_").map((num) => num * 1))
    }

    visited.add(str)
  }

  for(let i = start; i < nums.length; i++) {

    backtrace(result, nums, visited, `${str ? str + "_" : str}${nums[i]}`, i + 1)

  }

}
