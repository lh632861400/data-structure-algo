/**
 *
 * thoughts:
 * 二分查找
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {

  const rows = matrix.length;

  const cols = matrix[0].length


  let targetRow = -1;
  for(let i = 0; i < rows - 1; i++) {
    if(target >= matrix[i][0] && target < matrix[i + 1][0]) {
      targetRow = i;
      break;
    }
  }

  // 如果没有找到该行，判断最后一行是否存在这个范围
  if(targetRow === -1) {
    if (target < matrix[rows - 1][0] || target > matrix[rows - 1][cols - 1]) {
      return false;
    } else {
      targetRow = rows - 1;
    }
  }

  // 二分查找
  let left = 0;
  let right = cols - 1;
  let mid;
  const row = matrix[targetRow];
  let targetCol = -1;

  while(left <= right) {

    mid = left + ((right - left) >> 1);

    if(row[mid] === target) {
      targetCol = mid;
      break;
    }else if(target < row[mid]) {
      right = mid - 1;
    }else {
      left = mid + 1;
    }

  }

  return targetCol !== -1;


};
