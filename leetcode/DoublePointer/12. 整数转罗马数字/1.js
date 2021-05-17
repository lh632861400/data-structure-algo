/**
 *
 *
 * thoughts:
 * 双指针
 *
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {

  const map = new Map([
    [1, 'I'],
    [4, 'IV'],
    [5, 'V'],
    [9, 'IX'],
    [10, 'X'],
    [40, 'XL'],
    [50, 'L'],
    [90, 'XC'],
    [100, 'C'],
    [400, 'CD'],
    [500, 'D'],
    [900, 'CM'],
    [1000, 'M']
  ]);

  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  let i = 0;

  let result = '';

  while(num !== 0) {

    // 如果当前的选择的数字大于num则使用下一个数字
    if(num < nums[i]) {
      i++
    }else {
      result += map.get(nums[i])
      num = num - nums[i]
    }

  }

  return result;

};
