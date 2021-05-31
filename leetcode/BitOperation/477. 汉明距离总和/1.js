/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function(nums) {

  const len = nums.length;

  let count = 0;
  for(let i = 0; i < 30; i++) {

    let temp = 0;
    for(let j = 0; j < len; j++) {

      if(((nums[j] >> i) & 1) === 1) {
        temp++;
      }

    }

    count = count + temp * (len -temp)

  }

  return count;

};
