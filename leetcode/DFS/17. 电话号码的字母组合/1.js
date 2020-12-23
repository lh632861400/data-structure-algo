/**
 *
 * thoughts:
 *
 * 回溯
 * 每一个按键是一个选择节点，对应3个或者4个路径
 *
 * O(3 ^ m * 4 ^ n)
 * O(1)
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {

  const map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['q', 'p', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  const res = [];

  if(!digits) {
    return res;
  }

  backtrack(res, '', map, digits, 0)

  return res;

};

/**
 *
 * @param {string[]} 所有组个的数组
 * @prev {string} 上一个组合的字符窜
 *
 * */
function backtrack(res, prev, map, digits, j) {

  // 结束条件
  if(j >= digits.length) {
    res.push(prev);
    return;
  }

  const strArr = map[digits[j]];
  for(let i = 0; i < strArr.length; i++) {

    // 做出选择
    prev = prev + strArr[i];

    // 回溯
    backtrack(res, prev, map, digits, j + 1)

    // 撤销选择
    prev = prev.substring(0, prev.length - 1);

  }

}
