/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/sum-of-square-numbers/solution/ping-fang-shu-zhi-he-by-leetcode-solutio-8ydl/
 *
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {

  let left = 0;
  let right = Math.floor(Math.sqrt(c));

  let sum = 0;

  while(left <= right) {

    sum = left ** 2 + right ** 2;
    if(sum === c) {
      return true
    }else if(sum < c) {
      left++;
    }else {
      right--;
    }

  }

  return false;

};
