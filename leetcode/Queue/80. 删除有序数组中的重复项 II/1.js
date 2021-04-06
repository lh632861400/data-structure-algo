/**
 *
 * thoughts:
 * dfs
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

  if(!nums.length) {
    return 0;
  }


  let cfStartIndex = 0;
  let cfEndIndex = -1;
  const STEP = 2;

  for(let i = 1; i < nums.length; i++) {
    if(nums[cfStartIndex] === nums[i]) {
      cfEndIndex = i;
    }else {

      if(cfEndIndex - cfStartIndex >= STEP) {

        // 原地删除
        removeDuplicatesHelper(nums, cfStartIndex, cfEndIndex - STEP)

        // 重置
        cfStartIndex = i;
        cfEndIndex = -1;

      }else {

        cfStartIndex = i;
        cfEndIndex = -1;

      }

    }
  }

  if(cfEndIndex - cfStartIndex >= STEP) {

    // 原地删除
    removeDuplicatesHelper(nums, cfStartIndex, cfEndIndex - STEP)

  }

  nums.sort((a, b) => {
    if(a !== null && b !== null) {
      return a - b;
    }else {
      if(a === null) {
        return 1;
      }else {
        return -1;
      }
    }
  });

  const aa = nums.findIndex((value) => {
    return value === null;
  })

  if(aa > -1) {
    return aa;
  }

  return nums.length;

};

function removeDuplicatesHelper(nums, start, end) {

  for(let i = start; i <= end; i++) {
    nums[i] = null;
  }

}
