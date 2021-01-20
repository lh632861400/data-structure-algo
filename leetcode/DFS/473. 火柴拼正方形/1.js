/**
 *
 * thoughts:
 * 回溯
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var makesquare = function(nums) {

  if(!nums.length) {
    return false;
  }

  let sum = 0;

  for(let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  sum = sum / 4;

  if(Number.isInteger(sum)) {
    return dfs(nums, 0 ,0, 0, 0, 0, sum)
  }else {
    return false;
  }

};

function dfs(nums, i, top, right, bottom, left, sum) {

  if(top > sum || right > sum || bottom > sum || left > sum) {
    return false;
  }

  if(i === nums.length) {

    return top === sum && right === sum && bottom === sum && left === sum;

  }

  const len = nums[i];

  return dfs(nums, i + 1, top + len, right, bottom, left, sum) ||
    dfs(nums, i + 1, top, right + len, bottom, left, sum) ||
    dfs(nums, i + 1, top, right, bottom + len, left, sum) ||
    dfs(nums, i + 1, top, right, bottom, left + len, sum)

}
