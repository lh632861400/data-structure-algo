/**
 *
 * thoughts:
 * 暴力求解
 *
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {

  const result = [];

  for(let [start, end] of queries) {
    if(start === end) {
      result.push(arr[start])
    }else {
      result.push(queryHelper(arr, start, end))
    }

  }

  return result;

};

function queryHelper(arr, start, end) {

  let result = arr[start];
  for(let i = start + 1; i <= end; i++) {
    result ^= arr[i]
  }

  return result;

}
