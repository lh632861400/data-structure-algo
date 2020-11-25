/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/increasing-decreasing-string/solution/shang-sheng-xia-jiang-zi-fu-chuan-by-leetcode-solu/
 *
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {

  const nums = new Array(26);
  nums.fill(0);

  let result = '';

  let code = 'a'.charCodeAt(0);

  for(let i = 0; i < s.length; i++) {
    nums[s.charAt(i).charCodeAt(0) - code]++;
  }

  while(result.length < s.length) {

    // 选择从小到大的字符窜
    for(let i = 0; i < 26; i++) {
      if(nums[i] > 0) {
        result += String.fromCodePoint(i + code)
        nums[i]--;
      }
    }

    // 选择从大到小的字符窜
    for(let i = 25; i >= 0; i--) {
      if(nums[i] > 0) {
        result += String.fromCodePoint(i + code)
        nums[i]--;
      }
    }

  }

  return result;

};

