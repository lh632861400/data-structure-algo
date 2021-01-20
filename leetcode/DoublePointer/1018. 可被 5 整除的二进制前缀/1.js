/**
 *
 * thoughts:
 * 位操作
 *
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(A) {

  // 移位之前的总和
  let ys = 0;

  const result = [];

  for(let i = 0; i < A.length; i++) {

    ys =((ys << 1) + A[i]) % 5;

    result.push(ys === 0)

  }

  return result;

};
