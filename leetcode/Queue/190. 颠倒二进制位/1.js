/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
let visited = new Map();
var reverseBits = function(n) {

  if(Object.is(n, -0)) {
    return 1;
  }

  if(visited.has(n)) {
    return visited.get(n)
  }

  let bcs = n;
  let ys = 0;
  let str = '';
  let len = 32;

  for(let i = 0; i < len; i++) {
    ys = bcs & 1;
    bcs = bcs >>> 1;
    str = ys + str;
  }

  bcs = str.split("").reverse().join("");

  bcs = parseInt('0' + bcs, 2)

  visited.set(n, bcs);

  return bcs;

};
