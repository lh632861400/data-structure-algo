/**
 *
 *
 * thoughts:
 * 移位操作
 * 参考：
 * 201. 数字范围按位与
 *
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {

  // 2的幂就是只有一个1 brian移除最右边的1

  if(n <= 0) {
    return false;
  }

  let result = n & (n - 1);

  return result === 0;

};
