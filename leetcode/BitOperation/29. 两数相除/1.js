/**
 *
 *
 * thoughts;
 * https://leetcode-cn.com/problems/divide-two-integers/solution/po-su-de-xiang-fa-mei-you-wei-yun-suan-mei-you-yi-/
 *
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {

  if(dividend === 0) {
    return 0;
  }

  let ans = 0;

  if(divisor === 1 || divisor === -1) {
    ans = divisor === 1 ? dividend : -dividend
  }else {

    let sign = 1;

    if(dividend > 0 && divisor < 0 || dividend < 0 && divisor > 0) {
      sign = -1;
    }

    ans = divideHelper(Math.abs(dividend), Math.abs(divisor));

    ans = sign === 1 ? ans : -ans

  }

  if(ans > (-(1 << 31) - 1)) {
    ans = -(1 << 31) - 1;
  }

  return ans;


};


function divideHelper(dividend, divisor) {

  if(dividend < divisor) {
    return 0;
  }

  let count = 1;
  let tb = divisor;

  while((tb + tb) <= dividend) {
    count = count + count;

    tb = tb + tb;
  }

  return count + divideHelper(dividend - tb, divisor)

}
