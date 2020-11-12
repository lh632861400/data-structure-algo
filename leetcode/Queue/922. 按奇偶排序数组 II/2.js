/**
 *
 * thought:
 * https://leetcode-cn.com/problems/sort-array-by-parity-ii/solution/an-qi-ou-pai-xu-shu-zu-ii-by-leetcode-solution/
 * 双指针
 * perf:
 * 相对于遍历两次，这个只需要遍历一次
 * O(n)
 * 0(1)
 *
 * @param {number[]} A
 * @return {number[]}
 */
function swap(A, i, j) {
  let value = A[i];
  A[i] = A[j];
  A[j] = value
}
var sortArrayByParityII = function(A) {
  const len = A.length;
  let j = 1;
  for(let i = 0; i < len; i = i + 2) {

    // 如果A[i]是奇数，则查找距离j位置最近的偶数，交换位置
    if(A[i] & 1) {
      while (A[j] & 1) {
        j += 2;
      }

      swap(A, i, j);
    }
  }

  return A;
};
