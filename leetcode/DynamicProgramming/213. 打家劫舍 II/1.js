/**
 *
 * thoughts:
 * 动态规划
 *
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

  if(nums.length === 1) {
    return nums[0];
  }

  if(nums.length === 2) {
    return Math.max(nums[0], nums[1])
  }

  const length = nums.length;

  // dp[i]定义[start, i]能够偷到最大的金额
  let previ2, previ1;

  let max = 0;

  // 偷第一间，则不能偷最后一间[0, length - 2]
  previ2 = nums[0];
  previ1 = Math.max(nums[0], nums[1]);

  max = previ1;

  for(let i = 2; i < length - 1; i++) {
    max = Math.max(nums[i] + previ2, previ1);

    [previ2, previ1] = [previ1, max];
  }

  // 偷最后一间则不能偷第一间[1, length - 1];
  previ2 = nums[1];
  previ1 = Math.max(nums[1], nums[2]);

  const prevMax = max;

  max = previ1;

  for(let i = 3; i < length; i++) {
    max = Math.max(nums[i] + previ2, previ1);

    [previ2, previ1] = [previ1, max];
  }

  max = Math.max(prevMax, max);


  return max;

};
