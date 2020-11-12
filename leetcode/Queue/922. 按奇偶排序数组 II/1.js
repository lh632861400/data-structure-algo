/**
 *
 * thought:
 * 两次遍历
 * 两个数组 odd even
 * odd 存奇数
 * even 存偶数
 * 返回一个总的数组
 * O(n)
 * 0(n)
 *
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  const odd = [];
  const even = [];

  for(let i = 0; i <A.length; i++) {
    if(A[i] & 1 === 1) {
      odd.push(A[i])
    }else {
      even.push(A[i])
    }
  }

  const result = [];
  let oddi = 0;
  let eveni = 0;
  for(let i = 0; i < A.length; i++) {

    // 如果是奇数位
    if(i & 1 === 1) {
      result[i] = odd[oddi];
      oddi++
    }else {
      result[i] = even[eveni];
      eveni++;
    }
  }

  return result;
};
