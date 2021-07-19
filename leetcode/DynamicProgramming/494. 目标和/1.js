/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/target-sum/solution/mu-biao-he-by-leetcode-solution-o0cp/
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {

  const sum = nums.reduce((sum, a) => sum + a, 0 );

  const diff = sum - target;

  if(diff < 0 || diff % 2 !== 0) {
    return 0;
  }

  const neg = diff / 2;

  const arr = new Array(nums.length + 1).fill(0);

  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(neg + 1).fill(0)
  }

  arr[0][0] = 1;

  for(let i = 1;i <= nums.length; i++) {
    let num = nums[i - 1];
    for(let j = 0; j <= neg; j++) {
      arr[i][j] = arr[i - 1][j]

      if(j >= num) {
        arr[i][j] = arr[i][j] +  arr[i - 1][j - num];
      }
    }
  }

  return arr[nums.length][neg]

};
