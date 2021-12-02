/**
 *
 *
 * thoughts:
 * 按位异或
 *
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {

  return nums.reduce((sum, a) => {
    return sum ^ a;
  }, 0)

};
