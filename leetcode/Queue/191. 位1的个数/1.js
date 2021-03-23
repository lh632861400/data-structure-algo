/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {

  let sum = n;
  let str = '';

  let nextSum = n;

  let temp = 0;
  let count = 0;

  while(sum !== 0) {


    temp = sum & 1;

    if(temp === 1) {
      count++
    }

    sum = sum >>> 1

  }

  return count;

};
