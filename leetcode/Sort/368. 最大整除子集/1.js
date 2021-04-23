/**
 *
 * thoughts:
 * 排序
 *
 * 最大要求后一个元素是前一个元素的倍数，使整个元素倍数最小，记录每一个队列的最大值，就能够得到当前队列的最大整除子级
 * 不能够整除重启一个队列
 * 查看所有队列的长度
 *
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function(nums) {

  // 记录每一个队列的最大值, key为最大值, value为数组
  const map = new Map();

  nums.sort((a, b) => {
    return a - b;
  })

  for(let i = 0; i < nums.length; i++) {

    let added = false;
    let willAddArr = new Map()
    // 判断当前元素属于那个队列
    for(let [key ,arr] of map) {
      if(nums[i] % key === 0) {

        added = true;

        if(arr)

        let temp = willAddArr.get(nums[i]);
        let aa = [...arr, nums[i]];
        if(temp) {

          if(aa.length > temp.length) {
            temp = aa;
          }

          willAddArr.set(nums[i], temp);
        }else {
          willAddArr.set(nums[i], aa);
        }

      }
    }

    if(!added) {
      map.set(nums[i], [nums[i]])
    }else {
      for(let [key ,value] of willAddArr) {
        map.set(key, value)
      }
    }

  }

  let resutaa = []

  for(let [key, arr] of map) {

    if(arr.length > resutaa.length) {
      resutaa = arr;
    }

  }

  return resutaa;

};
