/**
 *
 * thoughts:
 * dfs
 *
 * O(n ^ 2)
 *
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {

  const arr = [];

  for(let i = 0; i < n; i++) {
    arr[i] = new Array(n)
  }

  dfs(arr, n, 'right', 0, 0, 1)

  return arr;

};

function dfs(arr, n, dir, i, j, num) {

  // base case
  if( i >= n || j >= n || arr[i][j]) {
    return;
  }

  arr[i][j] = num;

  let nextDir = dir;
  if(dir === 'right') {

    if(j === n - 1 || arr[i][j + 1]) {
      nextDir = 'down'
    }

  }

  if(dir === 'down') {

    if(i === n - 1 || arr[i + 1][j]) {
      nextDir = 'left'
    }

  }

  if(dir === 'left') {

    if(j === 0 || arr[i ][j - 1]) {
      nextDir = 'top'
    }

  }

  if(dir === 'top') {

    if(i === 0 || arr[i - 1][j]) {
      nextDir = 'right'
    }

  }

  let nexti = i;
  let nextj = j;
  if(nextDir === 'right') {
    nextj = j + 1;
  }

  if(nextDir === 'down') {
    nexti = i + 1;
  }

  if(nextDir === 'left') {
    nextj = j - 1;
  }

  if(nextDir === 'top') {
    nexti = i - 1;
  }

  dfs(arr, n, nextDir, nexti, nextj, num + 1)

}
