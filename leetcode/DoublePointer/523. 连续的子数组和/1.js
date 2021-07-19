/**
 *
 *
 * thoughts:
 * 前缀和
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {

  const n = nums.length;

  if(n < 2) {
    return false;
  }

  for(let i = 0; i < nums.length - 1; i++) {

    let arr = new Array(nums.length - i);
    arr[0] = nums[i] % k;
    let mod = 0;
    for(let j = i + 1; i < nums.length; j++) {

      // 判断余数
      mod = (arr[0] + nums[j]) % k;
      if(mod === 0) {
        return true;
      }

      arr[j - i] = mod;

    }

  }

  return false;

};
