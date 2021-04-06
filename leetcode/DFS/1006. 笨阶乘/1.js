/**
 *
 * thoughts:
 * 暴力求解
 *
 * @param {number} N
 * @return {number}
 */
var clumsy = function(N) {

  if(N < 4) {
    return -clumsyHelper(N);
  }

  const arr = [];
  arr.push(Math.floor(N * (N - 1) / (N - 2)));
  arr.push(N - 3);
  for(var i = N - 4; i > 3; i = i - 4) {
    arr.push(-Math.floor(i * (i - 1) / (i - 2)));
    arr.push(i - 3);
  }

  arr.push(clumsyHelper(i))

  return arr.reduce((sum, num) => {
    return sum + num
  }, 0)

};

function clumsyHelper(num) {
  if(num === 3) {
    return -6;
  }

  if(num === 2) {
    return -2;
  }

  if(num === 1) {
    return -1;
  }

  if(num === 0) {
    return 0;
  }
}
