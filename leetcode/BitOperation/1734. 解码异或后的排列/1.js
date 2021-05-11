/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/decode-xored-permutation/solution/jie-ma-yi-huo-hou-de-pai-lie-by-leetcode-9gw4/
 *
 * @param {number[]} encoded
 * @return {number[]}
 */
var decode = function(encoded) {

  const n = encoded.length + 1;

  let total = 0;

  for(let i = 1; i <= n; i++) {
    total = total ^ i;
  }

  let odd = 0;
  for(let i = 1; i < n - 1; i = i + 2) {
    odd = odd ^ encoded[i]
  }

  const perm = new Array(n);

  perm[0] = total ^ odd;

  for(let i = 0; i < n - 1; i++) {
    perm[i + 1] = perm[i] ^ encoded[i]
  }

  return perm;

};
