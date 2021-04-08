/**
 *
 * thoughts:
 * 双指针
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {

  const n = nums.length;
  let l = 0;
  let r = n - 1;

  if(n === 1) {
    return nums[0]
  }

  let mid = -1;

  while(l < r ) {

    mid = l + ((r - l) >> 1)

    if(nums[mid] > nums[r]) {
      l = mid + 1;
    }else {
      r = mid;
    }

  }

  return nums[r]

};
