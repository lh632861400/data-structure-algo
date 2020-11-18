/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/matrix-cells-in-distance-order/solution/ju-chi-shun-xu-pai-lie-ju-zhen-dan-yuan-ge-by-leet/
 * 对所有点的曼哈顿距离进行排序
 * 0(RClogRC)
 * O(1)
 *
 *
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function(R, C, r0, c0) {

  let results = new Array(R * C);

  for(let i = 0; i < R; i++) {
    for(let j = 0; j < C; j++) {
      results[i * C + j] = [i , j]
    }
  }

  results.sort((a, b) => {

    return Math.abs(a[0] - r0) + Math.abs(a[1] - c0) - (Math.abs(b[0] - r0) + Math.abs(b[1] - c0))

  })

  return results;

};
