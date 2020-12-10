/**
 *
 * thoughts:
 * 回溯
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {

  let size = 0;

  function backTrack(m , n, rowIndex, colIndex) {
    // 停止回溯条件
    if(rowIndex >= m || colIndex >= n) {
      return true;
    }

    // 循环
    for(let i = rowIndex; i < m; i++) {

      for(let j = colIndex; j < n; i++) {

        // 一些操作

        // 做出选择
        if(i < m && j < n) {
          size++;
        }

        // 继续回溯
        if(!backTrack(m, n, i + 1, j)) {
          size++;
        }

        if(!backTrack(m, n, i, j + 1)) {
          size++;
        }

        // 一些操作

        // 取消选择

      }

    }

    return false;

  }

};
