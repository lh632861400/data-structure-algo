/**
 *
 * thoughts:
 * 暴力求解
 *
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const INVALID_VALUE = -1;
var removeElement = function(nums, val) {

  if(!nums.length) {
    return nums.length;
  }

  let count = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] === val) {
      nums[i] = INVALID_VALUE
    }else {
      count++;
    }
  }

  nums.sort((a, b) => {
    return b - a;
  })

  return count;

};
