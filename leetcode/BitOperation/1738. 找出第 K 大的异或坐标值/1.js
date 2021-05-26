/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value/solution/zhao-chu-di-k-da-de-yi-huo-zuo-biao-zhi-mgick/
 *
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthLargestValue = function(matrix, k) {

  const rows = matrix.length;

  const cols = matrix[0].length;

  const results = new Array(rows + 1).fill(0);

  const arr = [];

  for(let i = 0; i <= rows; i++) {
    results[i] = new Array(cols + 1).fill(0);
  }

  // 计算所有坐标的异或值
  for(let i = 1; i <= rows; i++) {
    for(let j = 1; j <= cols; j++) {
      results[i][j] = results[i - 1][j] ^ results[i][j - 1] ^ results[i - 1][j - 1] ^ matrix[i - 1][j - 1]

      arr.push(results[i][j])
    }
  }

  arr.sort((a, b) => {
    return b - a;
  })

  return arr[k - 1]

};
