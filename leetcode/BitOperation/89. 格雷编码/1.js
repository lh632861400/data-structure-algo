/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/gray-code/solution/gray-code-jing-xiang-fan-she-fa-by-jyd/
 *
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {

  const result = [];

  result.push(0);

  let head = 1;

  for(let i = 0; i < n; i++) {

    for(let j = result.length - 1; j >=0; j--) {
      result.push(result[j] + head)
    }

    head = head << 1;

  }

  return result;

};
