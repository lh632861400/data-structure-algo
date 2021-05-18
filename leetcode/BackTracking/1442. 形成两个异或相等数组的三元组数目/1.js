/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/solution/xing-cheng-liang-ge-yi-huo-xiang-deng-sh-jud0/
 *
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {

  let count = 0;

  const len = arr.length;

  const s = new Array(len + 1).fill(0)

  for(let i = 0; i < len; i++) {
    s[i + 1] = s[i] ^ arr[i]
  }

  for(let i = 0; i < len; i++) {

    for(let j = i + 1; j < len; j++) {

      for(let k = j; k < len; k++) {

        if(s[i] === s[k + 1]) {
          count++
        }

      }

    }

  }

  return count;

};
