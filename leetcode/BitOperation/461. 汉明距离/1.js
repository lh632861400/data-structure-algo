/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {

  let result = x ^ y;

  let remain = 0;

  let count = 0;

  while(result) {

    remain = result & 1;

    if(remain === 1) {
      count++
    }

    result = result >> 1;

  }

  return count;

};
