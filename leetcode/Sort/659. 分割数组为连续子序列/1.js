/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/solution/fen-ge-shu-zu-wei-lian-xu-zi-xu-lie-by-l-lbs5/
 * HashMap + 最小优先级堆
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {

  const map = new Map();

  for(let i = 0; i < nums.length; i++) {
    const x = nums[i];

    if(!map.has(x)) {
      map.set(x, new MinPriorityQueue());
    }

    if(map.has(x - 1)) {
      const prevLength = map.get(x - 1).dequeue()['priority'];
     if(map.get(x - 1).isEmpty()) {
       map.delete(x - 1);
     }
      map.get(x).enqueue(x, prevLength + 1);
    }else {
      map.get(x).enqueue(x, 1);
    }
  }

  for([key, value] of map) {
    if(value.front()['priority'] < 3) {
      return false;
    }
  }

  return true;

};
