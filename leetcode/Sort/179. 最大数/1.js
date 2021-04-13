/**
 *
 * thoughts:
 * 二叉堆
 *
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {

  const _num = nums.map((num) => {
    return num + "";
  });

  function largestNumberHelper(a, b) {

    len = Math.min(a.length, b.length);

    // 按最高位从高到低排序
    for(i = 0; i < len; i++) {
      if(a[i] > b[i]) {
        return -1;
      }else if(a[i] < b[i]) {
        return 1;
      }
    }

    // 排序超出位置序号的继续排序，相当于截取后面的字符窜继续排序

    if(a.length === b.length) {
      return 0;
    }

    if(a.length < b.length) {
      return largestNumberHelper(b.substring(i), a)
    }else {
      return largestNumberHelper(a.substring(i), b)
    }

  }

  let len = 0;
  let i = 0;
  _num.sort(largestNumberHelper);

  return _num.join("");

};
