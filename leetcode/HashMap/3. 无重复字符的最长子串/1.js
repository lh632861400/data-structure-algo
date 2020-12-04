/**
 *
 * thoughts:
 * 暴力求解
 * O(n ^ 2 * lgn)
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

  let sum = 0;
  const set = new Set();

  for(let i = 0; i < s.length; i++) { // 以i为开头的字符窜

    for(let j = i; j < s.length; j++) {

      // 如果已经包含了该字符窜，则比较当前set长度
      if(!set.has(s[j])) {
        set.add(s[j]);

        // 如果 j === s.length - 1,则说明没有重复
        if(j === s.length - 1) {

          // 跳出外层循环
          i = s.length;
          break;
        }
      }else {

        sum = Math.max(sum, set.size)

        set.clear();
        break;
      }

    }

  }

  if(set.size) {
    sum = Math.max(sum, set.size)
  }

  return sum;

};
