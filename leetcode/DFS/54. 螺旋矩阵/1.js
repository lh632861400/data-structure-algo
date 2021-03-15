/**
 *
 * thoughts:
 * DFS
 *
 * O(mn)
 * O(mn)
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {

  const rows = matrix.length;

  if(rows === 0) {
    return []
  }
  const cols = matrix[0].length;

  const arr = [];

  const visited = new Set();

  dfs(arr, matrix, visited, rows, cols, 'right', 0, 0)

  return arr;

};

function dfs(arr, matrix, visited, rows, cols, dir, i, j) {

  arr.push(matrix[i][j]);
  visited.add(`${i}_${j}`)

  let nextDir = dir;

  // base case
  if(dir === 'right') {

    if(visited.has(`${i}_${j + 1}`) || (j === cols - 1)) {
      nextDir = 'down'
    }
  }

  if(dir === 'down') {

    if(visited.has(`${i + 1}_${j}`) || (i === rows - 1)) {
      nextDir = 'left'
    }
  }

  if(dir === 'left') {

    if(visited.has(`${i}_${j - 1}`) || (j === 0)) {
      nextDir = 'top'
    }
  }

  if(dir === 'top') {

    if(visited.has(`${i - 1}_${j}`) || (i === 0)) {
      nextDir = 'right'
    }
  }

  let nexti = i;
  let nextj = j;

  if(nextDir === 'down') {
    if((i + 1) >= rows || visited.has(`${i + 1}_${j}`)) {
      return true;
    }

    nexti = i + 1;
  }

  if(nextDir === 'left') {
    if((j - 1) < 0 || visited.has(`${i}_${j - 1}`)) {
      return true;
    }

    nextj = j - 1;
  }

  if(nextDir === 'top') {
    if((i - 1) < 0 || visited.has(`${i - 1}_${j}`)) {
      return true;
    }

    nexti = i - 1;
  }

  if(nextDir === 'right') {
    if((j + 1) >= cols || visited.has(`${i}_${j + 1}`)) {
      return true;
    }

    nextj = j + 1;
  }

  // dfs
  dfs(arr, matrix, visited, rows, cols, nextDir, nexti, nextj)

}
