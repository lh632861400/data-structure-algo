/**
 *
 * thoughts:
 * 队列存储滑动窗口的值
 * O(n)
 * perf:
 * 记住最大值的索引，减少计算
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function getIndex(arr, start) {
  const len = arr.length;
  let max = arr[0];
  let maxIndex = start + 1;
  for(let i = 0; i < len; i++) {
    if(arr[i] > max) {
      max = arr[i];
      maxIndex = i + start + 1;
    }
  }

  return maxIndex;
}
var maxSlidingWindow = function(nums, k) {
  if(!nums.length) {
    return [];
  }
  const queue = [];
  let currentIndex = 0;
  for(let i = 0; i < k; i++) {
    queue.push(nums[i])

    if(nums[currentIndex] < nums[i]) {
      currentIndex = i;
    }
  }

  let arr = [nums[currentIndex]];

  for(let i = k; i < nums.length; i++) {
    // 得到华东窗口中的最大值
    queue.shift();
    queue.push(nums[i]);

    // 如果currentIndex 超出滑动窗口范围，更新currentIndex
    if(currentIndex <= i - k) {
      currentIndex = getIndex(queue, i - k)
    }

    // 如果当前元素大于nums[currentIndex]元素更新currentIndex
    if(nums[i] > nums[currentIndex]) {
      currentIndex = i;
    }

    arr.push(nums[currentIndex])
  }

  return arr;
};
