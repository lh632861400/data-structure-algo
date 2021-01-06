/**
 *
 * thoughts:
 * dfs
 *
 * O(m * n)
 * O(1)
 *
 * @param {character[][]} grid
 * @return {number}
 */
let sum = 0;
var numIslands = function(grid) {

  const rows = grid.length;
  const cols = grid[0].length;

  sum = 0;

  for(let i = 0; i < rows; i++) {

    for(let j = 0; j < cols; j++) {

      if(grid[i][j] === '1') {
        dfs(grid, rows, cols, i, j)
        sum++;
      }

    }

  }

  return sum;

};

/**
 *
 * i, j为1，递归遍历i j，如果都是0或者是边界返回true
 *
 * */
function dfs(grid, rows, cols, i ,j) {

  // 上下左右不是1
  if(i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === 'X' || grid[i][j] === '0') {
    return;
  }

  grid[i][j] = 'X';

  // 四周都是0或者是边界
  dfs(grid, rows, cols, i - 1, j)
  dfs(grid, rows, cols, i, j + 1)
  dfs(grid, rows, cols, i + 1, j)
  dfs(grid, rows, cols, i, j - 1)

}
