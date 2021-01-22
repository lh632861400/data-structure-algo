/**
 *
 * thoughts:
 * 双指针
 *
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {

  const arr = (K + "").split("");

  const len1 = A.length;

  const len2 = arr.length;

  const len = Math.min(len1, len2);

  const result = [];

  // 进位
  let jw = 0;

  let value = 0;
  let ys = 0;

  for(let i = 0; i < len; i++) {

    // 从尾部开始计算
    value = arr[len2 - 1 - i] * 1 + A[len1 - 1 - i] + jw;

    ys = value % 10;

    if(value >= 10) {
      jw = 1;
    }else {
      jw = 0;
    }

    result.push(ys)

  }

  // 判断各个数组比较长
  if(len1 > len) {

    for(let i = len1 - len - 1; i >= 0; i--) {

      value = A[i] + jw;

      ys = value % 10;

      if(value >= 10) {
        jw = 1;
      }else {
        jw = 0;
      }

      result.push(ys);

    }

  }else if(len2 > len) {

    for(let i = len2 - len - 1; i >= 0; i--) {

      value = arr[i] * 1 + jw;

      ys = value % 10;

      if(value >= 10) {
        jw = 1;
      }else {
        jw = 0;
      }

      result.push(ys);

    }

  }

  if(jw > 0) {
    result.push(jw)
  }

  return result.reverse();

};
