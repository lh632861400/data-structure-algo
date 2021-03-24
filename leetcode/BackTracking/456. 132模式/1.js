/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {

  let min = nums[0];

  const map = new Map();

  for(let i = 2; i < nums.length; i++) {

    const value = map.get(nums[i]) || 0;

    map.set(nums[i], value + 1)
  }

  const rightArr = [...map.keys()].sort(function (i1, i2) {
    return i1 - i2;
  })

  for(let j = 1; j < nums.length - 1; j++) {

    if(min < nums[j]) {

      // 得到k的值
      const value = getCeilingNum(rightArr, min);

      if(value !== undefined && value < nums[j]) {
        return true;
      }

    }

    min = Math.min(min, nums[j]);

    map.set(nums[j + 1], map.get(nums[j + 1]) - 1);

    if(map.get(nums[j + 1]) - 1 === 0) {
      const index = rightArr.findIndex(function (num) {
        return Object.is(nums[j + 1], num)
      })

      if(index > -1) {
        rightArr.splice(index, 1);
      }
    }

  }

  return false;

};

function getCeilingNum(rightArr, min) {

  for(let i = 0; i < rightArr.length; i++ ) {
    if(rightArr[i] > min) {
      return rightArr[i]
    }
  }

  return undefined;

}
