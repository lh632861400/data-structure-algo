/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/solution/sou-suo-xuan-zhuan-pai-xu-shu-zu-ii-by-l-0nmp/
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {

  const n = nums.length;

  if(n === 0) {
    return false;
  }

  if(n === 1) {
    return nums[0] === target
  }

  let l = 0;
  let r = n - 1;
  let mid = -1;

  while(l <= r) {
    mid = l + ((r - l) >> 1)

    if(nums[l] === nums[mid] && nums[mid] === nums[r]) {
      l++;
      r--;
    }else if(nums[l] <= nums[mid]) {
      if(nums[l] <= target && target < nums[mid]) {
        r = mid - 1;
      }else {
        l = mid + 1;
      }
    }else {
      if(nums[mid] < target && target < nums[n - 1]) {
         l = mid + 1;
      }else {
         r = mid - 1;
      }
    }
  }

  return false;


};
