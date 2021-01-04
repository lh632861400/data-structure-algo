/**
 *
 * 备忘录：
 *
 * perf:
 * 带备忘录求解
 *
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {

  const map = {};

  return libHelper(n, map)

};


/**
 *
 * 返回n所在的斐波那契数字
 *
 * */
function libHelper(n, map) {
  if(map[n] !== undefined) {
    return map[n];
  }

  if(n === 0) {
    return 0;
  }

  if(n === 1) {
    return 1;
  }

  const value = libHelper(n - 2, map) + libHelper(n - 1, map);
  map[n] = value;

  return value;
}
