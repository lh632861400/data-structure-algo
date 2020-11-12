/**
 *
 * thoughts:
 * 队列存储滑动窗口的值
 * O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function get(arr) {
  const len = arr.length;
  let max = arr[0]
  for(let i = 0; i < len; i++) {
    max = Math.max(max, arr[i])
  }

  return max;
}
var maxSlidingWindow = function(nums, k) {
  if(!nums.length) {
    return [];
  }
  const queue = [];
  let currentMax = nums[0];
  for(let i = 0; i < k; i++) {
    queue.push(nums[i])

    if(currentMax < nums[i]) {
      currentMax = nums[i];
    }
  }

  let arr = [currentMax];

  for(let i = k; i < nums.length; i++) {
     // 得到华东窗口中的最大值
    queue.shift();
    queue.push(nums[i]);
    arr.push(get(queue))
  }

  return arr;
};
