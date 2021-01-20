/**
 *
 * thoughts:
 * dfs
 *
 * @param {number[][]} matrix
 * @return {number}
 */
let max = 0;
var longestIncreasingPath = function(matrix) {

  max = 0;

  const rows = matrix.length;

  const visited = new Map();

  if(rows === 0) {
    return 0;
  }

  let cols = 0;

  if(rows > 0) {
    cols = matrix[0].length;
  }

  for(let i = 0; i < rows; i++) {

    for(let j = 0; j < cols; j++) {

      max = Math.max(max, longestIncreasingPathHelper(matrix, visited, rows, cols, i, j));

    }

  }

  return max;

};

function longestIncreasingPathHelper(matrix, visited, rows, cols, i, j) {

  if(visited.has(`${i}_${j}`)) {
    return visited.get(`${i}_${j}`)
  }

  // 上
  let top = 1;
  if(i >= 1) {
    if(matrix[i - 1][j] > matrix[i][j]) {
      top = 1 + longestIncreasingPathHelper(matrix, visited, rows, cols, i - 1, j)
    }
  }

  // 右
  let right = 1;
  if(j <= cols - 2) {
    if(matrix[i][j + 1] > matrix[i][j]) {
      right = 1 + longestIncreasingPathHelper(matrix, visited, rows, cols, i, j + 1)
    }
  }

  // 下
  let bottom = 1;
  if(i <= rows - 2) {
    if(matrix[i + 1][j] > matrix[i][j]) {
      bottom = 1 + longestIncreasingPathHelper(matrix, visited, rows, cols, i + 1, j)
    }
  }

  // 左
  let left = 1;
  if(j >= 1) {
    if(matrix[i][j - 1] > matrix[i][j]) {
      left = 1 + longestIncreasingPathHelper(matrix, visited, rows, cols, i, j - 1)
    }
  }

  const max = Math.max(top, right, bottom, left);

  visited.set(`${i}_${j}`, max)

  return max;

}
