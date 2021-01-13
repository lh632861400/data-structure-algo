/**
 *
 * thoughts:
 * 暴力求解
 *
 * O(m * n * (m + n))
 *
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {

  if(!matrix.length) {
    return [];
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  const set = new Set();

  const result = [];

  for(let i = 0; i < rows; i++) {

    for(let j = 0; j < cols; j++) {

      const visited = new Set();

      const visited2 = new Set();

      if((canTPY(matrix, visited, rows, cols, i , j)) && canDXY(matrix, visited2, rows, cols, i, j)) {

        result.push([i , j])

      }
    }

  }

  return result;

};

function canTPY(matrix, visited, rows, cols, i, j) {

  if(visited.has(`${i}_${j}`)) {
    return false;
  }

  visited.add(`${i}_${j}`);

  if(i === 0 || j === 0) {
    return true;
  }

  if(i >= rows || j >= cols) {
    return false;
  }

  let top = false;
  if(i >= 1 && matrix[i][j] >= matrix[i - 1][j]) {
    top = canTPY(matrix, visited, rows,cols, i - 1, j);
  }

  if(top) {
    return top;
  }

  let left = false;
  if(j >= 1 && matrix[i][j] >= matrix[i][j - 1]) {
    left = canTPY(matrix, visited, rows,cols, i , j - 1);
  }

  if(left) {
    return left;
  }

  let bottom = false;
  if(i <= rows - 2 && matrix[i][j] >= matrix[i + 1][j]) {
    bottom = canTPY(matrix, visited, rows,cols, i + 1 , j );
  }

  if(bottom) {
    return bottom;
  }

  let right = false;
  if(j <= cols - 2 && matrix[i][j] >= matrix[i][j + 1]) {
    right = canTPY(matrix,visited, rows,cols, i , j + 1 );
  }

  return right;


}

function canDXY(matrix, visited, rows, cols, i, j) {

  if(visited.has(`${i}_${j}`)) {
    return false;
  }

  visited.add(`${i}_${j}`);

  if(i === rows - 1 || j === cols - 1) {
    return true;
  }

  if(i < 0 || j < 0) {
    return false;
  }

  let top = false;
  if(i >= 1 && matrix[i][j] >= matrix[i - 1][j]) {
    top = canDXY(matrix, visited, rows,cols, i - 1, j);

    if(top) {
      return top;
    }
  }

  let left = false;
  if(j >= 1 && matrix[i][j] >= matrix[i][j - 1]) {
    left = canDXY(matrix, visited, rows,cols, i , j - 1);

    if(left) {
      return left;
    }
  }

  let bottom = false;
  if( i<= rows - 2 && matrix[i][j] >= matrix[i + 1][j]) {
    bottom = canDXY(matrix, visited, rows,cols, i + 1 , j );

    if(bottom) {
      return bottom;
    }
  }

  let right = false;
  if(j <= cols - 2 && matrix[i][j] >= matrix[i][j + 1]) {
    right = canDXY(matrix,visited, rows,cols, i , j + 1 );
  }

  return right;


}
