/**
 *
 * thoughts:
 * dfs
 *
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {

  const badges = [];

  const rows = board.length;

  if(rows <= 1) {
    return;
  }

  const cols = board[0].length;

  for(let i = 0; i < cols;i++) {
    if(board[0][i] === 'O') {
      badges.push([0, i]);
    }

    if(board[rows - 1][i] === 'O') {
      badges.push([rows - 1, i]);
    }
  }

  for(let i = 1; i < rows - 1;i++) {
    if(board[i][0] === 'O') {
      badges.push([i, 0]);
    }

    if(board[i][cols - 1] === 'O') {
      badges.push([i, cols - 1]);
    }
  }

  for(let i = 0; i < badges.length; i++) {
    dfs(board, badges[i][0], badges[i][1], rows, cols)
  }

  for(let i = 0; i < rows; i++) {

    for(let j = 0; j < cols; j++) {

      if(board[i][j] === 'O') {
        board[i][j] = 'X'
      }else if(board[i][j] === 'H') {
        board[i][j] = 'O'
      }

    }

  }

};

/**
 *
 * dfs方法递归遍历节点0变为H，继续递归的条件当前节点为O
 *
 * */
function dfs(board, row, col, rows, cols) {

  if(row < 0 || row >= rows || col < 0 || col >= cols) {
    return;
  }

  // 上
  if(board[row][col] === 'O') {
    board[row][col] = 'H';

    dfs(board, row - 1, col, rows, cols)
    dfs(board, row, col + 1, rows, cols)
    dfs(board, row + 1, col, rows, cols)
    dfs(board, row, col - 1, rows, cols)
  }

  // 右

  // 下

  // 左

}
