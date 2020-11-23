/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/solution/yong-zui-shao-shu-liang-de-jian-yin-bao-qi-qiu-1-2/
 *
 * O(n ^ 2)
 * O(1)
 *
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {

  let count = 0;

  // 射爆的气球数小于总数
  while (points.length) {

    // 排序找到右边界最小的气球
    points.sort((a, b) => {
      return a[1] - b[1]
    })

    // 射出一支箭
    count++;

    // 过滤出没有射爆的气球
    const xEnd = points[0][1];

    points = points.filter((p) => {
      return p[1] < xEnd || p[0] > xEnd;
    })

  }

  return count;
};
